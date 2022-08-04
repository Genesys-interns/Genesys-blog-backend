/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
import userGoogleRouter from './userGoogle.routes.js';
import forgotPasswordRouter from './forgot-password.routes.js';

const router = express.Router();

router.use('/post', postRouter);
router.use('/users', userRouter);
router.use('/users/google_signin', userGoogleRouter);
<<<<<<< HEAD
router.use('/forgot-password', forgotPasswordRouter);
=======
>>>>>>> 00a49f7bedd96920d6dccd2712bcff0df9acce7b

export default router;
