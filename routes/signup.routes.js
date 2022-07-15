/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from 'express';
import userController from '../controllers/user.controller.js';
import validateUserSchema from '../validators/user.validator.js';
import validator from '../validators/user.validator.js';

const signUpRoute = express.Router();
signUpRoute.post('/', [validator(validateUserSchema)], userController.create);

export default signUpRoute;
