/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import { upload } from '../config/multer.config.js';
import validator from '../validators/validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import postControllerV2 from '../controllers/post.controller.v2.js';
import { postCategoryValidator, postIdValidator, postTitleValidator } from '../validators/post.validator.js';

const postRouter = express.Router();

postRouter.post('/create', [checkAuth, upload.single('image')], postControllerV2.createPost);

postRouter.get('/', postControllerV2.getPosts);

postRouter.get('/getbyid', [checkAuth, validator(postIdValidator)], postControllerV2.getPostById);

postRouter.post('/like', [checkAuth, validator(postIdValidator)], postControllerV2.like);

postRouter.get('/title', [checkAuth, validator(postTitleValidator)], postControllerV2.postByTitle);

postRouter.delete('/delete', [checkAuth, validator(postIdValidator)], postControllerV2.deletePost);

postRouter.get('/category', [checkAuth, validator(postCategoryValidator)], postControllerV2.getPostByCategories);

postRouter.get('/comments/:id', commentController.getComments);

export default postRouter;
