import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    required: true,
    type: String

  },
  description: {
    required: true,
    type: String

  },
  category: {
    required: true,
    type: String,
    enum: ['politics', 'entertainment', 'education', 'technology', 'sports', 'news']
  },
  body: {
    required: true,
    type: String
  },
  userId: {
    required: true,
    type: String,
    ref: 'Users'
  },
  image: {
    required: true,
    type: String
  },
  isDraft: {
    type: Boolean
  }

}, { timeStamps: true });

const postModel = mongoose.model('Posts', postSchema);
export default postModel;
