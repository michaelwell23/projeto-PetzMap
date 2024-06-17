import 'reflect-metadata';
import { createConnection } from 'typeorm';

import express from 'express';
import cors from 'cors';
import path from 'path';

import CleanupService from './controllers/CleanUpServiceController';

import 'express-async-errors';

import routes from './routes';
import errorHandler from './errors/handler';

import './database/connections';

const app = express();

createConnection().then(async () => {
  CleanupService.start();

  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(errorHandler);

  app.use('/', express.static(path.join(__dirname, '..', 'uploads')));
});

export default app;
