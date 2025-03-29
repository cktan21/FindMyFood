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

// add order to order and also updates credits if used 
router.post('/addorder', async (req, res) => {
    try {
        var addCredits
        const { orderContent, creditsContent } = req.body
        const addOrder = await order.addOrder(orderContent)
        
        // checks if credits has been used
        if (creditsContent) {
            addCredits = await order.useCredits(creditsContent)
        }
        else {
            addCredits = 'No Credits Deducted'
        }

        res.status(200).json({
            order: addOrder,
            credit: addCredits
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