import { bot } from '../model/user.js';

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
  res.status(200).send('Telegram webhook function alive');
}
