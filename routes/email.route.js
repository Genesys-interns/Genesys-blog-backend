/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import express from 'express';
import UserController from '../controllers/user.controller.js';

const emailSignupRoute = express.Router();

emailSignupRoute.get('/', UserController.verifyEmail);
// emailSignupRoute.get('/verifiyLink/:userId/:uniqueString', UserController.verifyLink);

export default emailSignupRoute;
