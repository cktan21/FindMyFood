// api/telegram.js
import { Telegraf } from 'telegraf';
import configureBot from '../model/user.js';
import 'dotenv/config';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
configureBot(bot);

// (Optional) to debug:
bot.on('update', u => console.log('📨 update:', JSON.stringify(u, null,2)));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      return res.status(200).end();
    } catch (err) {
      console.error('handleUpdate error:', err);
      return res.status(500).send('Bot error');
    }
  }
  // let GET verify the endpoint
  res.status(200).send('Telegram webhook function alive');
}
