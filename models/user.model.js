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



user.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export const User = mongoose.model('User', user);

export default {
  User
};
