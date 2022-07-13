import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import database from '../config/db.config.js';

const middleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan());
  app.use(express.static('uploads'));
  app.use(cors());
  database();
  app.use('*', (req, res) => {
    res.status(200).send('Server is up and running,check the API documentation');
  });
};

export default middleware;
