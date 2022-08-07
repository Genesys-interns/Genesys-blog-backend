/* eslint-disable import/extensions */
import express from 'express';
import draftsController from '../controllers/drafts.controller.js';
import { draftPostSchema } from '../validators/post.validator.js';
import checkAuth from '../middlewares/auth.middleware.js';
import validator from '../validators/validator.js';

const draftRouter = express.Router();

draftRouter.post('/', checkAuth, validator(draftPostSchema), draftsController.createDrafts);
draftRouter.delete('/:id', checkAuth, draftsController.deleteDrafts);
draftRouter.put('/:id', checkAuth, draftsController.updateDrafts);
draftRouter.get('/', checkAuth, draftsController.getDrafts);

export default draftRouter;
