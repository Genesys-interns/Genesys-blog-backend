/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
<<<<<<< HEAD
import loginGRoute from './loginGoogle.routes.js';

const router = express.Router();

router.use('/users/', loginGRoute);

router.get('/', (req, res) => {
  res.send({
    message: 'This is the home page'
  });
});
=======
import postRouter from './post.routes.js';
import userRouter from './user.routes.js';
import userGoogleRouter from './userGoogle.routes.js';
import forgotPasswordRouter from './forgot-password.routes.js';

const router = express.Router();

router.use('/post', postRouter);
router.use('/users', userRouter);

router.use('/users/google_signin', userGoogleRouter);
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26

router.use('/forgot-password', forgotPasswordRouter);

export default router;
