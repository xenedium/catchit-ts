import { Router } from 'express';
import { ArticleControllers } from '../Controllers';

const articleRouter = Router();

articleRouter.get('/:id', ArticleControllers.GetOne);

export default articleRouter;