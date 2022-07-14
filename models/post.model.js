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
<<<<<<< HEAD
    default: 'news',
=======
    required: true,
>>>>>>> blog_posts
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
  }

}, { timeStamps: true });

const postModel = mongoose.model('Posts', postSchema);
export default postModel;
