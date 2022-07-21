import express from 'express';
import passport from 'passport';

const loginGRoute = express.Router();

loginGRoute.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

loginGRoute.get('/google/redirect', (req, res) => {
  // Successful authentication, redirect success.
  res.send('success');
});

export default loginGRoute;
