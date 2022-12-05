import { Router } from 'express';
import { UserControllers } from '../Controllers';
import { UserAuthMiddleware } from '../Middlewares/UserAuthMiddleware';

const userRouter = Router();

userRouter.get('/me', UserAuthMiddleware(false) , UserControllers.UserMe);

export default userRouter;