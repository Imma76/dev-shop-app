import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import router from '../routes/index.routes.js';
import database from '../config/db.config.js';
import errorHandler from './error.handler.js';

const middleware = (app) => {
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('uploads'));
  database();
  app.use(router);
  app.use(errorHandler);
};
export default middleware;
