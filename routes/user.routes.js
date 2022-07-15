/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';
import validateUserSchema from '../validators/user.validator.js';
import validator from '../validators/validator.js';

const userRouter = express.Router();
userRouter.post('/', [validator(validateUserSchema)], userController.create);

export default userRouter;
