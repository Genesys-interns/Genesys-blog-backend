/* eslint-disable import/extensions */
import express from 'express';
import signUpRoute from './signup.routes';

const router = express.Router();
router.use('/signup', signUpRoute);

export default router;
