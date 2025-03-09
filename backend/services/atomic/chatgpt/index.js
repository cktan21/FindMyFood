const express = require('express');
const path = require('path');
require('dotenv').config();
const { FE_ENDPOINT } = process.env;
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const logger = require('./util/logger');

app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: ['http://localhost:5173', FE_ENDPOINT],
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

let apiRouter = require('./api/index');
app.use('/', apiRouter);

app.use(function(err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  res.json({
      message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;