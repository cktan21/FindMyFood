// api/notif.js
import express from 'express';
import { bot }       from '../model/user.js';
import { supabase }  from '../util/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, order_id, type, user_id } = req.body;

  // 1) Try in-memory (optional)
  // const session = Array.from(sessions.values()).find(s => s.uid === user_id);
  // let chatId = session?.chatId;

  // 2) Always load from Supabase
  const { data, error } = await supabase
    .from('user_sessions')
    .select('chat_id')
    .eq('uid', user_id)
    .maybeSingle();

  if (error || !data) {
    return res
      .status(404)
      .json({ error: 'No Telegram session found for that user' });
  }

  const chatId = data.chat_id;

  try {
    await bot.telegram.sendMessage(
      chatId,
      `🔔 You have a new ${type} for order ${order_id}:\n\n${message}`
    );
    return res.json({ message: 'Notification sent successfully' });
  } catch (err) {
    console.error('Error sending Telegram message:', err);
    return res
      .status(500)
      .json({ error: 'Failed to send Telegram message' });
  }
});

export default router;
