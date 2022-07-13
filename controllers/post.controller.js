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

  async getPosts(req, res) {
    const post = await postService.getPosts();
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
}

export default new PostController();
