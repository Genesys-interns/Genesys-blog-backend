/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true
  },
  firstName: {
    type: 'String',
    required: true
  },
  lastName: {
    type: 'String',
    required: true
  },
  googleId: {
    type: String
  },
  photo: {
    type: String
  },
  verifiedAt: {
    type: Date
  }

}, { timeStamps: true });

// Define static method to be used on User object
userSchema.methods.generateAuthToken = function t() { // t is short for token
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    role: this.role
  }, process.env.SECRET, { expiresIn: '7 days' });

  return token;
};

const User = mongoose.model('User', userSchema);
export default User;
