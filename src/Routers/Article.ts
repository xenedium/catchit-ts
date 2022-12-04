import { Router } from 'express';
import { ArticleControllers } from '../Controllers';

const articleRouter = Router();

articleRouter.get('/article/test', ArticleControllers.test);

export default articleRouter;