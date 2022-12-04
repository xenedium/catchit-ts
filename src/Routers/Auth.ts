import { Router } from 'express';
import { UploadMiddleware } from '../Middlewares/UploadMiddleware';
import { AuthControllers } from '../Controllers';

const authRouter = Router();

authRouter.post('/register', UploadMiddleware.single('image'), AuthControllers.Register);
authRouter.post('/login', AuthControllers.Login);

export default authRouter;