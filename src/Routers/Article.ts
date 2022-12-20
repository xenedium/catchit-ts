import { Router } from 'express';
import { ArticleControllers } from '../Controllers';
import { UserAuthMiddleware } from '../Middlewares/UserAuthMiddleware';

const articleRouter = Router();

articleRouter.get('/me', UserAuthMiddleware(false), ArticleControllers.Me);
articleRouter.get('/', ArticleControllers.GetMany);
articleRouter.get('/:id', ArticleControllers.GetOne);

export default articleRouter;