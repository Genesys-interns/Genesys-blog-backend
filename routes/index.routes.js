import express from 'express';
import postRoute from './post.routes.js';

const router = express.Router();

router.use('/post', postRoute);

export default router;
