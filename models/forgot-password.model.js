import mongoose from 'mongoose';

const ForgotPasswordSchema = new mongoose.Schema({
  userID: String,
  resetString: String,
  createdAt: Date,
  expiresAt: Date
}, { timestamps: true });

const forgotPasswordModel = mongoose.model('ForgotPassword', ForgotPasswordSchema);

export default forgotPasswordModel;
