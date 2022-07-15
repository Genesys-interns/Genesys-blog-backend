import mongoose from 'mongoose';

const user = new mongoose.Schema({

  email: {
    type: 'String',
    required: true,
    minlength: 16,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    minlength: 8
  },
  firstName: {
    type: 'String',
    required: true,
    minlength: 10
  },
  lastName: {
    type: 'String',
    required: true,
    minlength: 10
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
