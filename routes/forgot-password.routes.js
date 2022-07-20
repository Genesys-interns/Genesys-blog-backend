import express from 'express';
import forgotPasswordController from '../controllers/forgot-password.controller';

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post('/', forgotPasswordController.reset);
export default forgotPasswordRouter;
