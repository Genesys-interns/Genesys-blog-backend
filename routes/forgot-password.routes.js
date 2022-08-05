/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import express from 'express';
import forgotPasswordController from '../controllers/forgot-password.controller.js';

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/', forgotPasswordController.reset);
export default forgotPasswordRouter;
