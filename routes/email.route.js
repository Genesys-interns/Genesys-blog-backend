/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import express from 'express';
import UserController from '../controllers/user.controller.js';

const emailSignupRoute = express.Router();

emailSignupRoute.post('/', UserController.sendVerificationEmail);
emailSignupRoute.get('/verify/:token', UserController.verify);

export default emailSignupRoute;
