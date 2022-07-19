/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import postvalidator from '../validators/post.validator.js';

const postRouter = express.Router();

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
postRouter.post('/', upload.single('image'), validator(postvalidator), postController.createPost);
postRouter.get('/', postController.getPosts);
postRouter.get('/', postController.getPostByCategories);

export default postRouter;
