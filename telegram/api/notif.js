import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'telegram received message' });
        console.log(req.body);
        return req.body;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router 