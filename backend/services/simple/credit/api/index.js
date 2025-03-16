const express = require('express');

const credit = require('./credit');

const router = express.Router();

router.use('/credit', credit);

module.exports = router;