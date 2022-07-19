/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import { response } from 'express';
import postService from '../services/post.service.js';
import postModel from '../models/post.model.js';

class PostController {
  async createPost(req, res, next) {
    
    const body = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      userId: req.body.userId,
      body: req.body.body,
      image: req.file.originalname
    };
    
    const post =
      await postService.postBlog(body);
    return res.status(201).send({ status: true, message: 'post created successfully', body: post });
  }

  async getPosts(req, res) {
    const post = await postService.getPost();
    if (_.isEmpty(post)) {
      return res.status(200).send({ staus: true, message: 'no posts found' });
    }
    return res.status(200).send({
      status: true,
      body: post.map((doc) => ({
        title: doc.title,
        price: doc.description,
        imageUrl: `${process.env.production_route}${doc.image}`,
        description: doc.description,
        category: doc.category,

        body: doc.body,
        userId: doc.userId,

        _id: doc._id,
        request: {
          type: 'GET',
          url: `${process.env.production_route}${doc.image}`
        }
      }))
    });
  }

  async getPostByCategories(req, res) {
    const post = await postService.getPostByCategory(req.query.category);

    if (!post) {
      res.status(404).send({
        status: false,
        message: 'category does not exist'
      });
    }
    res.status(200).send({
      status: true,
      body: post.map((doc) => ({
        title: doc.title,
        price: doc.description,
        imageUrl: `${process.env.production_route}${doc.image}`,
        description: doc.description,
        category: doc.category,

        body: doc.body,
        userId: doc.userId,

        _id: doc._id,
        request: {
          type: 'GET',
          url: `${process.env.production_route}${doc.image}`
        }
      }))
    });
  }
}

export default new PostController();
