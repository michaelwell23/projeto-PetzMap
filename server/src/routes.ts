import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PetController from './controllers/PetController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/pets', PetController.index);
routes.get('/pets/:id', PetController.show);

routes.post('/pets', upload.array('images'), PetController.create);

routes.get('/pets/renew/:id', PetController.renew);
routes.delete('/pets/delete/:id', PetController.delete);

export default routes;
