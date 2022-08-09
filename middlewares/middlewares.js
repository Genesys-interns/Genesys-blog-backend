/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
<<<<<<< HEAD
import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth2';
=======
// import passport from 'passport';
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26
import database from '../config/db.config.js';
import router from '../routes/index.routes.js';
import errorHandler from './error.middleware.js';
import routerV2 from '../routes/index.routes.v2.js';

dotenv.config();

const middleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan());
  app.use(express.static('uploads'));
  app.use(cors());
  database();
<<<<<<< HEAD
  // app.use(passport.initialize());
  app.use(router);
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://localhost:4011/users/google/redirect'
      },
      () => {
        // callback function operation
      }
    )
  );
=======

  // app.use(session({ secret: 'SECRET' }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use('/api/v1', router);
  app.use('/api/v2', routerV2);

  // app.use(passport.initialize());
  
>>>>>>> 5a254e960019e181b83ef63020ec0512829ffe26
  app.use('*', (req, res) => {
    res.status(200).send('Server is up and running,check the API documentation');
  });
  app.use(errorHandler);
};

export default middleware;
