/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import userRouterV2 from './users.routes.v2.js';
import userGoogleRouter from './userGoogle.routes.js';
import forgotPasswordRouter from './forgot-password.routes.js';
import postRouterV2 from './post.routes.v2.js';
import draftRouter from './drafts.router.js';

const routerV2 = express.Router();

routerV2.use('/post', postRouterV2);
routerV2.use('/users', userRouterV2);

routerV2.use('/users/google_signin', userGoogleRouter);

routerV2.use('/forgot-password', forgotPasswordRouter);

routerV2.use('/drafts', draftRouter);

export default routerV2;
