import express from 'express';
import postController from '../controllers/post.controller.js';
import noteRouter from './post.routes.js';

const router = express.Router();

router.use('/post',noteRouter);
