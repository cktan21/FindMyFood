// model/user.js
'use strict';

const { Markup }   = require('telegraf');
const { supabase } = require('../util/db');
const logger       = require('../util/logger');
const fs   = require('fs');
const path = require('path');
const axios = require('axios');

// In‐memory session store
const sessions = new Map();
function getSession(ctx) {
  const chatId = ctx.chat?.id ?? ctx.from.id;
  if (!sessions.has(chatId)) sessions.set(chatId, {});
  return sessions.get(chatId);
}

module.exports = (bot) => {
  // 1) /start → prompt for email
  bot.start(async ctx => {
    const session = getSession(ctx);
    session.state = 'awaiting_email';
    delete session.email;
    delete session.password;
    delete session.uid;
  
    const response = await axios.get('https://findmyfood-telegram.vercel.app/FindMyFood.png', {
      responseType: 'stream'
    });

    await ctx.replyWithPhoto(
      { source: response.data },
      {
      caption: "Welcome! Please enter your email to log in:",
      parse_mode: 'HTML',
    });
  
    // 2) then send the login prompt
    // return ctx.reply('👋 Welcome! Please enter your email to log in:');
  });

  // 2) Handle email input
  bot.on('text', async ctx => {
    const session = getSession(ctx);
    const text = ctx.message.text.trim();

    if (session.state === 'awaiting_email') {
      session.email = text;
      session.state = 'awaiting_password';
      return ctx.reply('🔒 Got it! Now please enter your password:');
    }

    // 3) Handle password input
    if (session.state === 'awaiting_password') {
      session.password = text;

      try {
        // sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email:    session.email,
          password: session.password
        });
        if (error || !data.user) throw error || new Error('Login failed');

        // store UID for later
        session.uid   = data.user.id;
        session.state = 'logged_in';
        delete session.password;  // no longer needed

        return ctx.reply(
          '✅ You are now logged in!',
          Markup.inlineKeyboard([
            Markup.button.callback('View Orders', 'VIEW_ORDERS'),
            Markup.button.callback('View Queue',  'VIEW_QUEUE'),
          ])
        );

      } catch (err) {
        logger.error('Login error:', err);
        // reset to email step
        session.state = 'awaiting_email';
        delete session.password;
        delete session.uid;
        return ctx.reply(
          '❌ Login failed. Please enter your email again to try:',
        );
      }
    }

    // 4) Ignore other texts when logged in
    if (session.state === 'logged_in') {
      return;
    }
  });

  // 5) View Orders
  bot.action('VIEW_ORDERS', async ctx => {
    await ctx.answerCbQuery();
    const session = getSession(ctx);
    if (!session.uid) {
      return ctx.reply('⚠️ Please /start and log in first.');
    }

    // fetch orders by user_id = session.uid
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', session.uid);

    if (error) {
      logger.error('Orders fetch error:', error);
      return ctx.reply('❌ Could not load your orders.');
    }

    if (orders.length === 0) {
      return ctx.reply('📦 You have no orders yet.');
    }

    const list = orders.map(o => `- Order #${o.id}: ${o.status}`).join('\n');
    return ctx.reply(`📦 Here are your orders:\n${list}`);
  });

  // 6) View Queue
  bot.action('VIEW_QUEUE', async ctx => {
    await ctx.answerCbQuery();
    const session = getSession(ctx);
    if (!session.uid) {
      return ctx.reply('⚠️ Please /start and log in first.');
    }

    // fetch queue items by user_id = session.uid
    const { data: queue, error } = await supabase
      .from('queue')
      .select('*')
      .eq('user_id', session.uid);

    if (error) {
      logger.error('Queue fetch error:', error);
      return ctx.reply('❌ Could not load your queue.');
    }

    if (queue.length === 0) {
      return ctx.reply('🎟️ Your queue is empty.');
    }

    const list = queue.map((q, i) => `${i+1}. ${q.task_description}`).join('\n');
    return ctx.reply(`🎟️ Your current queue:\n${list}`);
  });

  // 7) /logout to clear session
  bot.command('logout', ctx => {
    const chatId = ctx.chat?.id ?? ctx.from.id;
    sessions.delete(chatId);
    return ctx.reply('🔒 You have been logged out. Type /start to log in again.');
  });
};
