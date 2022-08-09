/* eslint-disable import/no-cycle */
<<<<<<< HEAD
/* eslint-disable import/prefer-default-export */
=======
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26
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
