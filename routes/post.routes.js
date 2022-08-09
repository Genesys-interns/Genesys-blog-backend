/* eslint-disable import/extensions */
import express from 'express';
import { upload } from '../config/multer.config.js';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import { draftPostSchema } from '../validators/post.validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';


const postRouter = express.Router();

postRouter.get('/:title', postController.articleByTitle);
postRouter.patch('/:postid', postController.updateArticle);
postRouter.post('/', [
  checkAuth,
  upload.single('image'),
  validator(draftPostSchema)
], postController.createPost);

postRouter.get('/', postController.getPosts);
postRouter.get('/category/:category', postController.getPostByCategories);

postRouter.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);
postRouter.get('/comments/:id', commentController.getComments);
postRouter.get('/id/:id', postController.fetchPostById);


postRouter.delete('/:id', postController.deletePost);

export default postRouter;
