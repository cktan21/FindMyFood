import express from 'express';
const router = express.Router();

// Import the bot instance and getSession function
import { bot, sessions } from '../model/user.js'; // Assuming bot is exported from user.js// Assuming getSession is defined in user.js

router.post('/', async (req, res) => {
    try {
        console.log('Received notification request:', req.body);

        const { message, order_id, type, user_id } = req.body;

        // // Fetch user's session data
        // const session = getSession(user_id);

        // if (!session || !session.chatId) {
        //     return res.status(404).json({ error: 'User not found or chat ID not set' });
        // }

        if (sessions.uid == user_id){
            // Send the message via Telegram
            await bot.telegram.sendMessage(chatId, `You have a new Notification 🔔 for order: ${order_id} \n\n ${message}`);
        }

        return res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;