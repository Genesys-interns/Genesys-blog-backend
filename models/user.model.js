/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const user = new mongoose.Schema({

  email: {
    type: 'String',
    required: true,
    unique: true
  },
  password: {
    type: 'String'

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
  verified: {
    type: Boolean,
    default: false
  }
  // googleId: {
  //   required: true,
  //   type: String
  // },
  // name: {
  //   required: true,
  //   type: String
  // },
  // photo: {
  //   required: true,
  //   type: String
  // }
}, { timestamps: true });

user.methods.toJSON = function l() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

// Define static method to be used on User object
user.methods.generateToken = function t() { // t is short for token
  const token = jwt.sign({
    _id: this._id,
    email: this.email
  }, process.env.TOKEN_SECRET, { expiresIn: '10 mins' });

  return token;
};

export const User = mongoose.model('User', user);

export default {
  User
};
