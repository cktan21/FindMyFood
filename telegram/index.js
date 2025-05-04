import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import { FE_ENDPOINT } from './env.js'; // Create this file to store environment variables
import client from 'prom-client';
import cors from 'cors';
import logger from './util/logger.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

import apiRouter from './api/index.js';
app.use('/', apiRouter);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;