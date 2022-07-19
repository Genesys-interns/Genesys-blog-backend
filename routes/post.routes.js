/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import postvalidator from '../validators/post.validator.js';
import commentController from '../controllers/comment.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';
import commentvalidator from '../validators/comment.validator.js';

const postRouter = express.Router();

postRouter.get('/:title', postController.articleByTitle);
postRouter.patch('/:postid', postController.updateArticle);

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage:storage });
postRouter.post('/',  upload.single('image'),validator(postvalidator) , checkAuth, postController.createPost);
postRouter.get('/', postController.getPosts);
postRouter.get('/', postController.getPostByCategories);

postRouter.post('/comments', checkAuth, validator(commentvalidator), commentController.postComments);

postRouter.get('/:title', postController.articleByTitle);

postRouter.delete('/:id', postController.deletePost);

export default postRouter;
