/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import { upload } from '../config/multer.config.js';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';
import postControllerV2 from '../controllers/post.controller.v2.js';
import { postIdValidator } from '../validators/post.validator.js';

const postRouter = express.Router();

postRouter.post('/create', [checkAuth, upload.single('image')], postControllerV2.createPost);

postRouter.get('/', postControllerV2.getPosts);

postRouter.get('/getbyid', [checkAuth, validator(postIdValidator)], postControllerV2.getPostById);

postRouter.post('/like', [checkAuth, validator(postIdValidator)], postControllerV2.like);

postRouter.get('/category/:category', postController.getPostByCategories);

postRouter.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);
postRouter.get('/comments/:id', commentController.getComments);

postRouter.delete('/:id', postController.deletePost);

export default postRouter;
