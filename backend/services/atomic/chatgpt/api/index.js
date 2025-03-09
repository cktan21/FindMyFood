const express = require('express');

const reccomend = require('./reccomend');

const router = express.Router();

router.use('/reccomend', reccomend);

module.exports = router;