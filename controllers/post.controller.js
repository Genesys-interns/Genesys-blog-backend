/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
//import cloudinary from 'cloudinary';
import _ from 'lodash';
import cloudinary from '../config/cloudinary.config.js';
import postService from '../services/post.service.js';
import postvalidator from '../validators/post.validator.js';
// import { deleteFile } from '../services/post.service'

class PostController {
  async createPost(req, res, next) {
    const { _id, isPublished } = req.body;

    const data = req.body;
    data.userId = req.userData._id;
    data.image = 'imageUrl'; // || req.file?.originalname;
    const updateData = _.omit(data, '_id');

    // file upload only happens when the post ready to be published
    let post;

    if (!_id) {
      // if no post id exists create post(draft) with id
      post = await postService.postBlog(updateData);
    } else if (_id && !isPublished) {
      // if post exists and isPublished status is set to false update post(draft)
      post = await postService.updatePost(_id, _.omit(updateData, 'isPublished'));
    } else if (_id && isPublished) {
      // post exists and isPublished status is set to true update post(draft)
      const validated = await postvalidator.validateAsync(updateData);
      // upload post image to cloudinary
      if (!('file' in req)) {
        return res.status(404).send({
          success: false,
          message: 'no file found, please attached a file'
        });
      }

      const response = await cloudinary.uploadImage(req.file);

      await postService.deleteFile(req.file);

      validated.image = response.secure_url;

      post = await postService.updatePost(_id, validated);
    } else {
      throw new Error('Unable to create draft');
    }

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
        imageUrl: doc.image,
        description: doc.description,
        category: doc.category,
        views: doc.views,
        userId: doc.userId,

        _id: doc._id,
        request: {
          type: 'GET',
          url: doc.image
        }
      }))
    });
  }

  async articleByTitle(req, res) {
    const article = await postService.findByTitle(req.params.title);

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
    const post = await postService.getPostByCategory(req.params.category);

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
        imageUrl: doc.image,
        description: doc.description,
        category: doc.category,
        views: doc.views,
        _id: doc._id,
        createdAt: doc.createdAt,
        request: {
          type: 'GET',
          url: doc.image
        }
      }))
    });
  }

  async deletePost(req, res) {
    const post = await postService.findAndDeletePostById(req.params.id);
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
    const userArticle = await postService.userPost(id);
    return userArticle;
  }

  async fetchAllUserPosts(req, res) {
    const userPosts = await postService.getUserPostById(req.params.id);
    if (_.isEmpty(userPosts)) {
      return res
        .status(404)
        .send({ status: true, message: 'this user has no posts' });
    }
    return res.status(200).send({ status: true, body: userPosts });
  }

  async fetchPostById(req, res) {
    const posts = await postService.getPostById(req.params.id);
    if (_.isEmpty(posts)) {
      return res.status(404).send({ status: false, body: 'no post found' });
    }
    if (req.userData === undefined || req.userData !== req.posts.userId) {
      const update = await postService.updatePost(req.params.id, { views: posts.views + 1 });
    }

    return res.status(200).send({ status: true, body: posts });
  }
}
export default new PostController();
