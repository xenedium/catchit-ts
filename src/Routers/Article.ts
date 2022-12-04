import { Router } from 'express';
import { ArticleControllers } from '../Controllers';

const articleRouter = Router();

articleRouter.get('/', ArticleControllers.test);

export default articleRouter;