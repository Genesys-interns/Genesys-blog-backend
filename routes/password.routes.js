/* eslint-disable import/no-cycle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
import express from 'express';
import passwordController from '../controllers/password.controller.js';

const passwordRouter = express.Router();

passwordRouter.post('/reset', passwordController.forgot);
export default passwordRouter;