const express = require('express');
const router = express.Router();
const order = require('../model/order');

router.get('/', async (req, res) => {
    try {

        const { RecieptNo } = req.body;

        const orderitem = await order.getOrder(RecieptNo)
        res.status(200).json({ 
            message: orderitem
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/history', async (req, res) => {
    try {

        const { userId } = req.body;

        const orderHistory = await order.getOrderHistory(userId)
        res.status(200).json({ 
            message: orderHistory
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {

        const { userId, orderDetails } = req.body;

        const orderstatus = await order.makeOrder(userId, orderDetails)
        res.status(200).json({ 
            message: orderstatus
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/cancel', async (req, res) => {
    try {

        const { RecieptNo } = req.body;

        const response = await order.cancelOrder(RecieptNo)
        res.status(200).json({ 
            message: response
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/complete', async (req, res) => {
    try {

        const { RecieptNo } = req.body;

        const response = await order.completeOrder(RecieptNo)
        res.status(200).json({ 
            message: response
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;