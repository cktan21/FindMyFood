const express = require('express');
const router = express.Router();
const reccomend = require('../model/reccomend');

router.post('/', async (req, res) => {
    try {
      
      const { foodHistory } = req.body;
  
      const foodReccomendation = await reccomend.generateWorkout(foodHistory);
      console.log("Food Reccomendation generated!");
  
      res.status(200).json({ 
        message: "Food Reccomendation given successfully!", 
        foodReccomendation 
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
});

module.exports = router;