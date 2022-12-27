import { Router } from 'express';
import { UserControllers } from '../Controllers';
import { UploadMiddleware, UserAuthMiddleware } from '../Middlewares';

const userRouter = Router();

userRouter.get('/me', UserAuthMiddleware(false), UserControllers.Me);
userRouter.put('/', UserAuthMiddleware(false), UploadMiddleware('users').single('image'), UserControllers.Put);

export default userRouter;