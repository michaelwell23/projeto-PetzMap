import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import routes from './routes';

import './database/connections';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

export default app;
