const express = require('express');
const router = express.Router();
const order = require('../model/order');

router.post('/', async (req, res) => {
    try {

        const { userId, orderDetails } = req.body;

        const orderstatus = await order.makeorder(userId, orderDetails)
        res.status(200).json({ 
            message: orderstatus
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;