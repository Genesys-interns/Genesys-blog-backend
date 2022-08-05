import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  googleId: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  photo: {
    required: true,
    type: String
  }

}, { timeStamps: true });

const User = mongoose.model('User', userSchema);
export default User;
