import { Router } from 'express';
import { CategoryControllers } from '../Controllers';

const categoryRouter = Router();

categoryRouter.get('/category/test', CategoryControllers.test);

export default categoryRouter;