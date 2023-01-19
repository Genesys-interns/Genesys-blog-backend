/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
// import userGoogleRouter from './userGoogle.routes.js';
import forgotPasswordRouter from './forgot-password.routes.js';
import commentRouter from './comment.routes.js';

const router = express.Router();

router.use('/post', postRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter);

// router.use('/users/google_signin', userGoogleRouter);

router.use('/forgot-password', forgotPasswordRouter);

export default router;
