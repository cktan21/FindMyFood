import { Telegraf, Markup } from 'telegraf';
import { supabase }      from '../util/db.js';
import logger             from '../util/logger.js';
import axios              from 'axios';
import 'dotenv/config';

export const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const sessions = new Map();
export { sessions };

function getSession(ctx) {
  const chatId = ctx.chat?.id ?? ctx.from.id;
  if (!sessions.has(chatId)) sessions.set(chatId, {});
  const session = sessions.get(chatId);
  session.chatId = chatId;
  return session;
}
export { getSession };

// ——— BOT HANDLERS ———

bot.start(async (ctx) => {
  const session = getSession(ctx);
  session.state = 'awaiting_email';
  delete session.email;
  delete session.password;
  delete session.uid;

  const resp = await axios.get(
    'https://findmyfood-telegram.vercel.app/FindMyFood.png',
    { responseType: 'stream' }
  );

  await ctx.replyWithPhoto(
    { source: resp.data },
    { caption: 'Welcome! Please enter your email to log in:' }
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

      session.uid   = data.user.id;
      session.state = 'logged_in';
      delete session.password;

      await supabase
      .from('user_sessions')
      .upsert({ uid: session.uid, chat_id: session.chatId });

      return ctx.reply(
        'You are now logged in!',
        Markup.inlineKeyboard([
          Markup.button.callback('View Orders', 'VIEW_ORDERS'),
        ])
      );
    } catch (err) {
      logger.error('Login error:', err);
      session.state = 'awaiting_email';
      delete session.password;
      delete session.uid;
      return ctx.reply(
        '❌ Login failed. Please enter your email again to try:'
      );
    }
  }

  // ignore other text if already logged in
});

bot.action('VIEW_ORDERS', async (ctx) => {
  await ctx.answerCbQuery();
  const session = getSession(ctx);
  try {
    const response = await axios.get(
      `${process.env.TRAEFIK_BASE_URL}/order/orders?uid=${session.uid}`
    );
    const orders = response.data;
    if (!orders.length) {
      return ctx.reply('📦 You have no orders yet.');
    }

    const orderList = orders
      .map(order => {
        const items = order.info.items
          .map(i => `- ${i.qty} x ${i.dish} (€${i.price})`)
          .join('\n');
        return [
          `📦 Order ID: ${order.order_id}`,
          `📍 Restaurant: ${order.restaurant}`,
          `📝 Status: ${order.status}`,
          '',
          'Items:',
          items,
          '------------------------'
        ].join('\n');
      })
      .join('\n\n');

    return ctx.reply(`👇 Your orders:\n\n${orderList}`);
  } catch (err) {
    logger.error('Order fetch error:', err);
    return ctx.reply('❌ Could not load your orders.');
  }
});
