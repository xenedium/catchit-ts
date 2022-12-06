import { Router } from 'express';
import { UploadMiddleware } from '../Middlewares';
import { AuthControllers } from '../Controllers';

const authRouter = Router();

authRouter.post('/register', UploadMiddleware('users').single('image'), AuthControllers.Register);
authRouter.post('/login', AuthControllers.Login);
authRouter.post('/logout', AuthControllers.Logout);

export default authRouter;