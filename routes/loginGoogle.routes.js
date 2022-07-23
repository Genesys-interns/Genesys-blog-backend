/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import passport from 'passport';
import { logger } from '../app.js';

const loginGRoute = express.Router();

loginGRoute.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

loginGRoute.get('/google/redirect', (req, res) => {
  // Successful authentication, redirect success. http://localhost:4011/users/google/redirect
  logger.info('redircted successfully');
  res.send('success');
});

export default loginGRoute;
