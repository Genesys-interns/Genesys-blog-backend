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
  verifiedEmail: {
    type: Boolean
  }

}, { timeStamps: true });

const User = mongoose.model('User', userSchema);
export default User;
