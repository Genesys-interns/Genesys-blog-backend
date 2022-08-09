/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../app.js';

dotenv.config();

const database = () => {
<<<<<<< HEAD
  mongoose.connect(process.env.MONGODB_URI).then(() => console.log('database connected')).catch((err) => console.log(err));
=======
  mongoose.connect(process.env.MONGODB_URI).then((value) => logger.info('database connected')).catch((err) => logger.info(err));
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26
};

export default database;
