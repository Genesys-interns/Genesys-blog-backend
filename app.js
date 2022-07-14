/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import pino from 'pino';
import Joi from 'joi';
import passport from 'passport';
import middleware from './middlewares/middlewares.js';
import router from './routes/index.routes.js';

const logger = pino();
const app = express();

middleware(app);

const PORT = process.env.PORT || 4011;
app.listen(PORT, () => {
  logger.info(`PORT IS LISTENING ON ${PORT}`);
});

export default logger;
