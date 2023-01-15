import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  comment: {
    required: true,
    type: String

  },
  name: {
    required: true,
    type: String

  },
  email: {
    required: true,
    type: String
  },
  postId: {
    required: true,
    type: String
  },
  editorsId: {
    required: true,
    type: String
  }

}, { timeStamps: true, versionKey: false });

const commentModel = mongoose.model('Comments', commentSchema);
export default commentModel;
