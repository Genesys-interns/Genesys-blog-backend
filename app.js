/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import 'express-async-errors';
import express from 'express';
import pino from 'pino';
import middleware from './middlewares/middlewares.js';

export const logger = pino();
const app = express();

middleware(app);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  logger.info(`PORT IS LISTENING ON ${PORT}`);
});

export default logger;
