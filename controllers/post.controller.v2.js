/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
// import cloudinary from 'cloudinary';
import _ from 'lodash';
import cloudinary from '../config/cloudinary.config.js';
import postService from '../services/post.service.js';
// import { deleteFile } from '../services/post.service'

class PostController2 {
  async createPost(req, res) {
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, message: 'please upload an image' });
    }
    const result = await cloudinary.uploadImage(req.file.path);
    const data = {
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      image: result.url,
      userId: req.user._id
    };

    if (_.isEmpty(data.title || data.category || data.image || data.userId || data.body)) {
      return res.status(404).send({
        success: false,
        message: 'title, category, body, image and userId are required to create post'
      });
    }

    const post = await postService.postBlog(data);
    return res
      .status(201)
      .send({
        status: true,
        message: 'post created successfully',
        data: post
      });
  }

  async like(req, res) {
    const post = await postService.getPostById(req.body.id);
    if (_.isEmpty(post)) {
      res.status(404).send({
        success: false,
        message: 'Post does not exist'
      });
    }
    post.likes += 1;
    await post.save();
    if (post.likes === 1) {
      return res.status(200).send({
        success: true,
        message: 'This post was liked one time'
      });
    }
    if (post.likes === 0) {
      return res.status(200).send({
        success: true,
        message: 'This post has not been liked'

      });
    }
    return res.status(200).send({
      success: true,
      message: `This post was liked ${post.likes} times.`
    });
  }

  async updateTitle(req, res) {
    const post = await postService.getPostById(req.body.id);
    const newTitle = req.body.title;
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post with this Id does not exist.'
      });
    }
    if (post) {
      await post.updateOne({ title: newTitle });
    }
    return res.status(200).send({
      success: true,
      message: `Your new post title is ${post.title}`
    });
  }

  async updatePostBody(req, res) {
    const post = await postService.getPostById(req.body.id);
    const newBody = req.body.body;
    if (_.isEmpty(post)) {
      return res.status(404).send({
        success: false,
        message: 'Post with this Id does not exist.'
      });
    }
    if (post) {
      await post.updateOne({ body: newBody });
    }
    return res.status(200).send({
      success: true,
      message: 'Post body was updated successfully'
    });
  }

  async getPosts(req, res) {
    const post = await postService.getPost();
    if (_.isEmpty(post)) {
      return res.status(200).send({ staus: true, message: 'no posts found' });
    }
    return res.status(200).send({
      status: true,
      data: post
    });
  }

  async postByTitle(req, res) {
    const post = await postService.findByTitle(req.body.title);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: 'No post with this title exists'
      });
    }

    return res.status(201).send({
      success: true,
      data: post
    });
  }

  async getPostByCategories(req, res) {
    const post = await postService.getPostByCategory(req.body.category);

    if (!post) {
      res.status(404).send({
        status: false,
        message: 'no post exists with this category'
      });
    }
    res.status(200).send({
      status: true,
      data: post
    });
  }

  async deletePost(req, res) {
    const post = await postService.findAndDeletePostById(req.body.id);
    if (_.isEmpty(post)) {
      res.status(404).send({
        status: false,
        message:
          'Post does not exist, pleaase create a post before attempting to delete'
      });
    }
    res.status(200).send({
      success: true,
      message: 'Post deleted successfully'
    });
  }

  async updateArticle(req, res) {
    const data = { id: req.params.postid, newData: req.body };
    const updatedArticle = await postService.updatePost(data.id, data.newData);
    return res.status(200).send({
      status: true,
      message: 'Successfully updated the selected collection',
      data: updatedArticle,
      createdAt: updatedArticle.createdAt,
      updatedAt: updatedArticle.updatedAt

    });
  }

  async fetchUserArticle(id) {
    const userArticle = await postService.getUserPostById(id);
    return userArticle;
  }

  async fetchAllUserPosts(req, res) {
    const userPosts = await postService.getUserPostById(req.params.id);
    if (_.isEmpty(userPosts)) {
      return res
        .status(404)
        .send({ status: true, message: 'this user has no posts' });
    }
    return res.status(200).send({ status: true, data: userPosts });
  }

  async getPostById(req, res) {
    const posts = await postService.getPostById(req.body.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({
        status: false,
        body: 'Post does not exist'
      });
    }

    return res.status(200).send({
      status: true,
      data: posts
    });
  }
}
export default new PostController2();
