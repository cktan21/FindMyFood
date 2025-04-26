// api/user.js
const express       = require('express');
const { Telegraf }  = require('telegraf');
const configureUserBot = require('../model/user');
require('dotenv').config();

const router = express.Router();
const bot    = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

configureUserBot(bot);

bot.on('update', update => {
  console.log('📨 update:', JSON.stringify(update, null, 2));
});

const webhookPath = `/webhook/${process.env.TELEGRAM_SECRET_HASH}`;

router.post(
  webhookPath,
  express.json(),
  async (req, res) => {
    try {
      await bot.handleUpdate(req.body);
      return res.sendStatus(200);
    } catch (err) {
      console.error('❌ handleUpdate error:', err);
      return res.sendStatus(500);
    }
  }
);

(async () => {
  const fullUrl = `${process.env.NGROK_URL}/user${webhookPath}`;
  try {
    console.log('🔍 before setWebhook:', await bot.telegram.getWebhookInfo());

    await bot.telegram.setWebhook(fullUrl, {
      drop_pending_updates: true,
      allowed_updates: ['message','callback_query']
    });

    console.log('✅ webhook set to:', fullUrl);
    console.log('🔍 after setWebhook:', await bot.telegram.getWebhookInfo());
  } catch (err) {
    console.error('❌ Error setting Telegram webhook:', err);
  }
})();

module.exports = router;
