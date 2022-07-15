import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from '../config/db.config.js';
import router from '../routes/index.routes.js';
import errorHandler from './error.middleware.js';

const middleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan());
  app.use(express.static('uploads'));
  app.use(cors());
  database();
  app.use(router);
  app.use('*', (req, res) => {
    res.status(200).send('Server is up and running,check the API documentation');
  });
  app.use(errorHandler);
};

export default middleware;
