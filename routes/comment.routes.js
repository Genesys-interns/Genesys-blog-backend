/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import commentController from '../controllers/comment.controller.js';
import authentication from '../middlewares/auth.middleware.js';
import validator from '../validators/validator.js';
import commentvalidator from '../validators/comment.validator';

const commentRouter = express.Router();

commentRouter.post('/post', [authentication, validator(commentvalidator)], commentController.postComments);
export default commentRouter;
