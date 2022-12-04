import { Router } from 'express';
import { UserControllers } from '../Controllers';

const userRouter = Router();

userRouter.post('/', UserControllers.test);

export default userRouter;