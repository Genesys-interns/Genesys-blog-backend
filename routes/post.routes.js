import express from 'express';
import postController from '../controllers/post.controller.js';

const noteRouter = express.Router();

noteRouter.post('/',postController.createPost);

export default noteRouter;