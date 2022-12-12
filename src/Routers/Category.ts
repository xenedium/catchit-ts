import { Router } from 'express';
import { CategoryControllers } from '../Controllers';
import { UploadMiddleware } from '../Middlewares';
import { UserAuthMiddleware } from '../Middlewares/UserAuthMiddleware';

const categoryRouter = Router();

categoryRouter.post('/', UserAuthMiddleware(true) , UploadMiddleware('category').single('image'), CategoryControllers.Create);
categoryRouter.get('/:id', CategoryControllers.GetOne);
categoryRouter.get('/', CategoryControllers.GetMany);

export default categoryRouter;