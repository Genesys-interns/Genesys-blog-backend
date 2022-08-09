/* eslint-disable import/extensions */
import express from 'express';
import passportConfig from '../config/passport.config.js';
import userGoogleController from '../controllers/userGoogle.controller.js';

const passport = passportConfig();

const userGoogleRouter = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

userGoogleRouter.get(
  '/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  })
);

userGoogleRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  (req, res) => {
    res.redirect('/');
  }
);

userGoogleRouter.get('/', userGoogleController.authUser);

export default userGoogleRouter;
