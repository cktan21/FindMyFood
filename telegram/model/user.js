// model/user.js
'use strict';

const { Markup }   = require('telegraf');
const { supabase } = require('../util/db');
const logger       = require('../util/logger');
const fs   = require('fs');
const path = require('path');
const axios = require('axios');
const { orderFood, Queue, listenForNotifications, allQueueUpdates } = require('../util/api.js');

const sessions = new Map();
function getSession(ctx) {
  const chatId = ctx.chat?.id ?? ctx.from.id;
  if (!sessions.has(chatId)) sessions.set(chatId, {});
  return sessions.get(chatId);
}

module.exports = (bot) => {
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

  });

  bot.on('text', async ctx => {
    const session = getSession(ctx);
    const text = ctx.message.text.trim();

    if (session.state === 'awaiting_email') {
      session.email = text;
      session.state = 'awaiting_password';
      return ctx.reply('🔒 Got it! Now please enter your password:');
    }

    if (session.state === 'awaiting_password') {
      session.password = text;

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email:    session.email,
          password: session.password
        });
        if (error || !data.user) throw error || new Error('Login failed');

        session.uid   = data.user.id;
        session.state = 'logged_in';
        delete session.password;

        return ctx.reply(
          '✅ You are now logged in!',
          Markup.inlineKeyboard([
            Markup.button.callback('View Orders', 'VIEW_ORDERS'),
            Markup.button.callback('View Queue',  'VIEW_QUEUE'),
          ])
        );

      } catch (err) {
        logger.error('Login error:', err);
        session.state = 'awaiting_email';
        delete session.password;
        delete session.uid;
        return ctx.reply(
          '❌ Login failed. Please enter your email again to try:',
        );
      }
    }

    if (session.state === 'logged_in') {
      return;
    }
  });

  bot.action('VIEW_ORDERS', async ctx => {
    await ctx.answerCbQuery();
    const session = getSession(ctx);

    try {
      const orders = await orderFood.getOrdersByFilter(session.uid, '', '');
      if (!orders.length) {
        return ctx.reply('📦 You have no orders yet.');
      }
      const list = orders.map(o => `- #${o.id}: ${o.status}`).join('\n');
      return ctx.reply(`📦 Your orders:\n${list}`);
    } catch (err) {
      logger.error('Order fetch error:', err);
      return ctx.reply('❌ Could not load your orders.');
    }
  });

  bot.action('VIEW_QUEUE', async ctx => {
    await ctx.answerCbQuery();
    const session = getSession(ctx);

    try {
      const queue = await Queue.getAllQueue();
      if (!queue.length) {
        return ctx.reply('🎟️ Your queue is empty.');
      }
      const list = queue.map((q,i) => `${i+1}. ${q.task_description}`).join('\n');
      return ctx.reply(`🎟️ Current queue:\n${list}`);
    } catch (err) {
      logger.error('Queue fetch error:', err);
      return ctx.reply('❌ Could not load your queue.');
    }
  });

  listenForNotifications().subscribe(data => {
    sessions.forEach(session => {
      if (data.userId === session.uid) {
        bot.telegram.sendMessage(session.chatId, `🔔 New notification:\n${data.message}`);
      }
    });
  });

  allQueueUpdates().subscribe(items => {
    sessions.forEach(session => {
      bot.telegram.sendMessage(
        session.chatId,
        `🔄 Queue updated! There are now ${items.length} items:\n` +
        items.map((q,i) => `${i+1}. ${q.task_description}`).join('\n')
      );
    });
  });

  bot.command('logout', ctx => {
    const chatId = ctx.chat?.id ?? ctx.from.id;
    sessions.delete(chatId);
    return ctx.reply('🔒 You have been logged out. Type /start to log in again.');
  });
};
