import { Markup } from 'telegraf';
import { supabase } from '../util/db.js';
import logger from '../util/logger.js';
import axios from 'axios';
import 'dotenv/config';

const TRAEFIK_BASE_URL =  process.env.TRAEFIK_BASE_URL

const sessions = new Map();


function getSession(ctx) {
  const chatId = ctx.chat?.id ?? ctx.from.id;
  if (!sessions.has(chatId)) sessions.set(chatId, {});
  return sessions.get(chatId);
}

export default (bot) => {
  bot.start(async (ctx) => {
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
      }
    );
  });

  bot.on('text', async (ctx) => {
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
          email: session.email,
          password: session.password
        });
        if (error || !data.user) throw error || new Error('Login failed');
        
        session.uid = data.user.id;
        session.state = 'logged_in';
        delete session.password;

        return ctx.reply(
          `You are now logged in! ${session.uid}`,
          Markup.inlineKeyboard([
            Markup.button.callback('View Orders', 'VIEW_ORDERS'),
            // Markup.button.callback('View Queue', 'VIEW_QUEUE'),
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

  bot.action('VIEW_ORDERS', async (ctx) => {
    await ctx.answerCbQuery();
    const session = getSession(ctx);
    console.log(session.uid);
  
    try {
      // Fetch orders from the backend
      const response = await axios.get(`${TRAEFIK_BASE_URL}/orders?uid=${session.uid}`);
      const orders = response.data;
  
      if (!orders.length) {
        return ctx.reply('📦 You have no orders yet.');
      }
  
      // Format the orders into a readable message
      const orderList = orders.map((order) => {
        const items = order.info.items
          .map(
            (item) =>
              `- ${item.qty} x ${item.dish} (€${item.price})`
          )
          .join('\n');
  
        return `📦 Order ID: ${order.order_id}\n📍 Restaurant: ${order.restaurant}\n📝 Status: ${order.status}\n\nItems:\n${items}\n\n------------------------`;
      }).join('\n');
  
      return ctx.reply(`👇 Your orders:\n\n${orderList}`);
    } catch (err) {
      logger.error('Order fetch error:', err);
      return ctx.reply('❌ Could not load your orders.');
    }
  });
};

export { sessions };