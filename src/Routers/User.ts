import { Router } from 'express';
import { UserControllers } from '../Controllers';

const userRouter = Router();

userRouter.post('/register', UserControllers.register);

export default userRouter;