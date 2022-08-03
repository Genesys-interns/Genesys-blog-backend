/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import { draftPostSchema } from '../validators/post.validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';

const postRouter = express.Router();

postRouter.get('/:title', postController.articleByTitle);
postRouter.patch('/:postid', postController.updateArticle);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
postRouter.post('/', upload.single('image'), validator(draftPostSchema), checkAuth, postController.createPost);
postRouter.get('/', postController.getPosts);
postRouter.get('/', postController.getPostByCategories);

postRouter.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);
postRouter.get('/comments/:id', commentController.getComments);

postRouter.get('/:title', postController.articleByTitle);

postRouter.delete('/:id', postController.deletePost);

export default postRouter;
