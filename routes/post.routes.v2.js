/* eslint-disable import/extensions */
import express from 'express';
import { upload } from '../config/multer.config.js';
import postControllerV2 from '../controllers/post.controller.v2.js';
import validator from '../validators/validator.js';
import  { draftPostSchema, postvalidator2 } from '../validators/post.validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';


const postRouterV2 = express.Router();

postRouterV2.get('/:title', postControllerV2.articleByTitle);
postRouterV2.patch('/:postid', postControllerV2.updateArticle);

postRouterV2.post('/', [
  checkAuth,
  upload.single('image'),
  validator(postvalidator2)
], postControllerV2.createPost);

postRouterV2.get('/', postControllerV2.getPosts);
postRouterV2.get('/category/:category', postControllerV2.getPostByCategories);

postRouterV2.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);
postRouterV2.get('/comments/:id', commentController.getComments);
postRouterV2.get('/id/:id', postControllerV2.fetchPostById);


postRouterV2.delete('/:id', postControllerV2.deletePost);

export default postRouterV2;
