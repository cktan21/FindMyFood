const express = require('express');
const router = express.Router();
const order = require('../model/order');
const { stat } = require('fs');

router.get('/all', async (req, res) => {
    try {

        const allOrders = await order.getAllOrders()
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user', async (req, res) => {
    try {

        const { uid } = req.body

        const allOrders = await order.getUserOrders(uid)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/order', async (req, res) => {
    try {

        const { oid } = req.body

        const allOrders = await order.getOrder(oid)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/restaurant', async (req, res) => {
    try {

        const { restaurant } = req.body

        const allOrders = await order.getRestaurantOrders(restaurant)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updatestatus', async (req, res) => {
    try {

        const { oid, status } = req.body

        const allOrders = await order.updateStatus(oid, status)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/addorder', async (req, res) => {
    try {

        const { orderContent } = req.body

        const allOrders = await order.addOrder(orderContent)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;