/* eslint-disable import/extensions */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
// import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth2';
// import passportConfig from '../config/passport.config.js';
import database from '../config/db.config.js';
import router from '../routes/index.routes.js';
import errorHandler from './error.middleware.js';

dotenv.config();

const middleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan());
  app.use(express.static('uploads'));
  app.use(cors());
  database();
  // app.use(session({ secret: 'SECRET' }));
  app.use(passport.initialize());
  // app.use(passport.session());
  app.use(router);
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://localhost:4011/users/google/redirect'
      },
      () => {

      }
    )
  );
  app.use('*', (req, res) => {
    res.status(200).send('Server is up and running,check the API documentation');
  });
  app.use(errorHandler);
};

export default middleware;
