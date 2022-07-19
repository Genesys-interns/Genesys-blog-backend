import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares.js';

const logger = pino();
const app = express();

middleware(app);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  logger.info(`PORT IS LISTENING ON ${PORT}`);
});
