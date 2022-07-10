import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import database from '../config/db.config';

const middleware = (app) => {
  app.use(express.static());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan());
  app.use(cors());
  database();
};

export default middleware;
