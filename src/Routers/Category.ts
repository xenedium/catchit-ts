import { Router } from 'express';
import { CategoryControllers } from '../Controllers';
import { UploadMiddleware } from '../Middlewares';
import { UserAuthMiddleware } from '../Middlewares/UserAuthMiddleware';

const categoryRouter = Router();

categoryRouter.post('/', UserAuthMiddleware(true) , UploadMiddleware('category').single('image'), CategoryControllers.Create);

export default categoryRouter;