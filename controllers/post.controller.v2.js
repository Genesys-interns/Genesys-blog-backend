/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
// import cloudinary from 'cloudinary';
import _ from 'lodash';
import cloudinary from '../config/cloudinary.config.js';
import postServiceV2 from '../services/post.service.v2.js';
// import { deleteFile } from '../services/post.service'

class PostController {
  async createPost(req, res, next) {
    if (!req.file) {
      return res
        .status(400)
        .send({ status: true, message: 'please upload an image' });
    }
    const result = await cloudinary.uploadImage(req.file.path);

    const { body } = req;
    body.userId = req.userData._id;
    body.image = result.url;
    body.isPublished = true;
    const post = await postServiceV2.postBlog(body);
    return res
      .status(201)
      .send({ status: true, message: 'post created successfully', body: post });
  }

  async getPosts(req, res) {
    const post = await postServiceV2.getPost();
    if (_.isEmpty(post)) {
      return res.status(200).send({ staus: true, message: 'no posts found' });
    }
    return res.status(200).send({
      status: true,
      body: post
    });
  }

  async articleByTitle(req, res) {
    const article = await postServiceV2.findByTitle(req.params.title);

    if (!article) {
      return res.status(404).send({
        success: false,
        body: 'Could not find the requested article'
      });
    }

    return res.status(201).send({
      success: true,
      body: article
    });
  }

  async getPostByCategories(req, res) {
    const post = await postServiceV2.getPostByCategory(req.params.category);

    if (!post) {
      res.status(404).send({
        status: false,
        message: 'category does not exist'
      });
    }
    res.status(200).send({
      status: true,
      body: post
    });
  }

  async deletePost(req, res) {
    const post = await postServiceV2.findAndDeletePostById(req.params.id);
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
    const updatedArticle = await postServiceV2.updatePost(data.id, data.newData);
    return res.status(200).send({
      status: true,
      message: 'Successfully updated the selected collection',
      body: {
        data: { updatedArticle },
        createdAt: updatedArticle.createdAt,
        updatedAt: updatedArticle.updatedAt,
        request: {
          type: 'GET'
          // url: `localhost:3000/products/${updatedArticle._id}`
        }
      }
    });
  }

  async fetchUserArticle(id) {
    const userArticle = await postServiceV2.getUserPostById(id);
    return userArticle;
  }

  async fetchAllUserPosts(req, res) {
    const userPosts = await postServiceV2.getUserPostById(req.params.id);
    if (_.isEmpty(userPosts)) {
      return res
        .status(404)
        .send({ status: true, message: 'this user has no posts' });
    }
    return res.status(200).send({ status: true, body: userPosts });
  }

  async fetchPostById(req, res) {
    const posts = await postServiceV2.getPostById(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({ status: false, body: 'no post found' });
    }
    if (req.userData === undefined || req.userData !== req.posts.userId) {
    }

    return res.status(200).send({ status: true, body: posts });
  }
}
export default new PostController();
