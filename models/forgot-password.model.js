import mongoose from 'mongoose';

const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    unique: true
  }
}, { timestamps: true });

const forgotPasswordModel = mongoose.model('ForgotPassword', ForgotPasswordSchema);

export default forgotPasswordModel;
