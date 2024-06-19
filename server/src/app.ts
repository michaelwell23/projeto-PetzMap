import 'dotenv/config';

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';
import routes from './routes';
import errorHandler from './errors/handler';
import { createConnection } from 'typeorm';
import { cleanUpRecords } from './services/CleanUpService';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use('/', express.static(path.join(__dirname, '..', 'uploads')));

createConnection()
  .then(async () => {
    await cleanUpRecords();
    console.log('Aplicação iniciada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar e executar:', error);
  });

export default app;
