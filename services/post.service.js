/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import fsPromises from 'fs/promises';
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

  async getUserPostById(id) {
    const posts = await postModel.find({ _userId: id });
    return posts;
  }

  async getPostById(id) {
    const posts = await postModel.findById(id);
    return posts;
  }

  async getPostByCategory(data) {
    const posts = await postModel.find({ category: data });
    return posts;
  }

  async findByTitle(data) {
    const post = await postModel.find({ title: data });
    return post;
  }

  async deletePosts(id) {
    const posts = await postModel.deleteOne({ _id: id });
    return posts;
  }

  async findAndDeletePostById(id) {
    const postId = await postModel.findByIdAndDelete(id);
    return postId;
  }

  async updatePost(id, data) {
    const post = await postModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });

    return post;
  }

  async getAllDrafts() {
    const post = await postModel.find({ isPublished: false });
    return post;
  }

  async deleteFile(file) {
    // if the file exist
    await fsPromises.access(file.path);
    await fsPromises.unlink(file.path);
    // try {

    //   return true;
    // } catch (error) {
    //   // try is used here to avoid unnecessary error when a file does not exist
    //   return false;
    // }
  }
}

export default new PostService();
