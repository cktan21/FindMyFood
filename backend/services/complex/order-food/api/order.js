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

router.get('/graborder', async (req, res) => {
    try {
        // Extract optional query parameters from the request
        var uid = req.query.uid; // Query parameter for user ID [[2]]
        var oid = req.query.oid; // Query parameter for order ID [[2]]
        var restaurant = req.query.restaurant; // Query parameter for restaurant [[2]]

        if (!uid) {
            uid = ""
        }

        if (!oid) {
            oid = ""
        }

        if (!restaurant) {
            restaurant = ""
        }

        const allOrders = await order.getOrder(uid, oid, restaurant)
        res.status(200).json({
            message: allOrders
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cancel Queue
router.put('/cancel/:oid/:restaurant', async (req, res) => {
    try {

        const { oid, restaurant } = req.params;
        const allOrders = await order.cancelOrder(oid)
        const queue = await order.cancelQ(oid, restaurant)
        res.status(200).json({
            order: allOrders,
            queue: queue
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// add order to order, add to queue and update credits if used 
router.post('/addorder', async (req, res) => {
    try {
        var addCredits = 'No Credits Deducted'
        const { orderContent, creditsContent } = req.body
        const addOrder = await order.addOrder(orderContent)

        // checks if credits has been used
        // js is a very annoying language 
        if (Object.keys(creditsContent).length > 0) {
            addCredits = await order.useCredits(creditsContent)
        }

        const toQ = {
            restaurant: addOrder.restaurant,
            user_id: addOrder.user_id,
            order_id: addOrder.order_id
        }

        const adQ = await order.addQ(toQ)

        const toRabbiMQ = {
            message: `Your Order ${addOrder.order_id} from ${addOrder.restaurant} has been successfully sent to the Kitchen!`,
            order_id: addOrder.order_id,
            type: "notification",
            user_id: addOrder.user_id
        }

        const rabbitMQ = await order.SendRabbitMQ(toRabbiMQ)

        res.status(200).json({
            order: addOrder,
            credit: addCredits,
            queue: adQ,
            rabbitMQ : rabbitMQ
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// gets the amt of credits a user has
router.get('/credits/:uid', async (req, res) => {
    try {

        const { uid } = req.params;
        const addOrder = await order.getCredits(uid)

        res.status(200).json({
            message: addOrder
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;