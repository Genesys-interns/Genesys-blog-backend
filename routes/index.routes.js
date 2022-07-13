import express from 'express';
import postController from '../controllers/post.controller.js';

const router = express.Router();

router.use('/post',postController.createPost);
