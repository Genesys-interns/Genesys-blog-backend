/* eslint-disable import/extensions */
import express from 'express';
import noteRouter from './post.routes.js';

const router = express.Router();

router.use('/post', noteRouter);

export default router;
