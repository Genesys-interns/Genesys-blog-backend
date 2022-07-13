/* eslint-disable class-methods-use-this */
import postModel from '../models/post.model.js';

class PostService {
  async postBlog(data) {
    const post = await postModel.create(data);
    return post;
  }

  async getBlog() {
    const posts = await postModel.find();
    return posts;
  }
}

export default new PostService();
