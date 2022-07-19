/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import postModel from '../models/post.model.js';

class PostService {
  async postBlog(data) {
    const post = await postModel.create(data);
    return post;
  }

  async getPost() {
    const posts = await postModel.find();
    return posts;
  }

  async getPostByCategory(data) {
    const posts = await postModel.find({ category: data });
    return posts;
  }

  async findByTitle(title) {
    const post = await postModel.findOne({ title });
    return post;
  }
}

export default new PostService();
