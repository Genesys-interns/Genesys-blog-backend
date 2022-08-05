/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const userSchema = mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    unique: true
  },
  verifiedAt: {
    type: false
  }

}, { timeStamps: true });

// Define static method to be used on User object
userSchema.methods.generateAuthToken = function t() { // t is short for token
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role
  }, process.env.SECRET, { expiresIn: '7d' });
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
