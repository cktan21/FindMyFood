import express from 'express';
import { Telegraf } from 'telegraf';
import configureBot from '../model/user.js';
import 'dotenv/config';

const router = express.Router();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
configureBot(bot);

// debug incoming updates
bot.on('update', u => console.log('📨 update:', JSON.stringify(u, null, 2)));

const secretHash = process.env.TELEGRAM_SECRET_HASH;
const webhookPath = `/user/webhook/${secretHash}`;

// choose base URL depending on env
const isProd = !!process.env.VERCEL_URL;
const baseUrl = isProd
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_URL;

// 1) register the webhook
(async () => {
  const fullUrl = `${baseUrl}${webhookPath}`;
  console.log(fullUrl);
  try {
    console.log('🔍 before setWebhook →', await bot.telegram.getWebhookInfo());
    await bot.telegram.setWebhook(fullUrl, {
      drop_pending_updates: true,
      allowed_updates: ['message', 'callback_query']
    });
    console.log('✅ webhook set to:', fullUrl);
    console.log('🔍 after setWebhook →', await bot.telegram.getWebhookInfo());
  } catch (err) {
    console.error('❌ Error setting Telegram webhook:', err);
  }
})();

// 2) handle POSTs
router.post(
  webhookPath,
  express.json(),
  async (req, res) => {
    try {
      await bot.handleUpdate(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.error('❌ handleUpdate error:', err);
      res.sendStatus(500);
    }
  }
);

export default router;
