/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import verifyEmailRoute from './email.route.js';

const router = express.Router();

router.use('/sendEmail/', verifyEmailRoute);

export default router;
