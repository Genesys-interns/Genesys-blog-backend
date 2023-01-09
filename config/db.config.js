/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../app.js';

dotenv.config();

const database = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGODB_URI)
    .then((value) => logger.info('database connected'))
    .catch((err) => logger.error(err));
};

export default database;
