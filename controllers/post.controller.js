/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import postService from '../services/post.service.js';

class PostController {
  async createPost(req, res, next) {
    console.log(req.file);
    const body = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      userId: req.body.userId,
      body: req.body.body,
      image: req.file.originalname
    };
    const post = await postService.postBlog(body);
    return res.status(201).send({ status: true, message: 'post created successfully', body: post });
  }

}

export default new PostController();
