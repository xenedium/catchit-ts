import { Router } from 'express';
import { CategoryControllers } from '../Controllers';

const categoryRouter = Router();

categoryRouter.get('/', CategoryControllers.test);

export default categoryRouter;