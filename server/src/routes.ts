import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  console.log('Hello World');
});

export default routes;
