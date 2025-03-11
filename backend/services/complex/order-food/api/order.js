const express = require('express');
const router = express.Router();
const order = require('../model/order');

router.get('/', async (req, res) => {
    try {

        const healthcheck = await order.healthcheck()
        res.status(200).json({ 
            message: healthcheck
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;