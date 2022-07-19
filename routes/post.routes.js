/* eslint-disable import/extensions */
import express from 'express';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';
import validator from '../validators/validator.js';


const postRouter = express.Router();

postRouter.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);


export default postRouter;
