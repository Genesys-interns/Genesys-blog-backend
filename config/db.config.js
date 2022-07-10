import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = () => {
  mongoose.connect(process.env.MONGODB_URI).then((value) => console.log('database connected')).catch((err) => console.log(err));
};

export default database;
