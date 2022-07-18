/* eslint-disable import/extensions */
import express from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller.js';
import validator from '../validators/validator.js';
import postvalidator from '../validators/post.validator.js';

const postRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
postRouter.post('/', upload.single('image'), validator(postvalidator), postController.createPost);
postRouter.get('/', postController.getPosts);

export default postRouter;
