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
import scheduleInactivePetsCleanup from './services/ScheduleCleanup';

const app = express();

createConnection()
  .then(async () => {
    await cleanUpRecords();

    scheduleInactivePetsCleanup();

    console.log('Aplicação iniciada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar e executar:', error);
  });

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.use('/', express.static(path.join(__dirname, '..', 'uploads')));

export default app;
