import mongoose from 'mongoose';

const userVerificationSchema = mongoose.Schema({
  uniqueString: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true
  },
  expiredAt: {
    type: Date,
    required: true
  }
});

const UserVerification = mongoose.model('UserVerification', userVerificationSchema);
export default UserVerification;
