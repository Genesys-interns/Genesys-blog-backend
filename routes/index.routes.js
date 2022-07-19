/* eslint-disable import/extensions */
import express from 'express';
import noteRouter from './post.routes.js';
import userGoogleRouter from './userGoogle.routes.js';

const router = express.Router();

router.use('/post', noteRouter);
router.use('/users/google_signin', userGoogleRouter);

export default router;
