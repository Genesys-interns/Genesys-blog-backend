/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import loginGRoute from './loginGoogle.routes.js';

const router = express.Router();

router.use('/users/', loginGRoute);

router.get('/', (req, res) => {
  res.send({
    message: 'This is the home page'
  });
});

export default router;
