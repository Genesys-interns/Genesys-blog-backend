import mongoose from 'mongoose';

const user = new mongoose.Schema({

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

  }
}, { timestamps: true });

export const User = mongoose.model('User', user);

export default
User;
