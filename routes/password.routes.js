/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import express from 'express';
import passwordController from '../controllers/password.controller.js';

const passwordRouter = express.Router();

passwordRouter.post('/forgot', passwordController.forgot);
passwordRouter.get('/reset', passwordController.reset);
export default passwordRouter;
