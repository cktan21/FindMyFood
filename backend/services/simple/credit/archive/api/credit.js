const express = require('express');
const router = express.Router();
const credit = require('../model/credit');

router.get('/', async (req, res) => {
    try {

        const { uuid } = req.body;

        const response = await credit.getCredit(uuid)

        res.status(200).json({ 
            response
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    try {

        const { uuid, creditAmount } = req.body;

        const response = await credit.addCredit(uuid, creditAmount)

        res.status(200).json({ 
            message: "Credit Added"
          });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;