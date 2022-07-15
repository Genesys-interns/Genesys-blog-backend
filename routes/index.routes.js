/* eslint-disable import/extensions */
import express from 'express';
import noteRouter from './post.routes.js';
import userRouter from './user.routes.js';

const router = express.Router();

router.use('/post', noteRouter); 
router.use('/users', userRouter);

export default router;
