import { Router } from 'express';
import { ArticleControllers } from '../Controllers';
import { UploadMiddleware, UserAuthMiddleware } from '../Middlewares';

const articleRouter = Router();

articleRouter.get('/me', UserAuthMiddleware(false), ArticleControllers.Me);
articleRouter.get('/', ArticleControllers.GetMany);
articleRouter.get('/:id', ArticleControllers.GetOne);
articleRouter.post('/', UserAuthMiddleware(false), UploadMiddleware('articles').array('images'), ArticleControllers.Create);
articleRouter.put('/:id', UserAuthMiddleware(false), UploadMiddleware('articles').array('images'), ArticleControllers.Update);

export default articleRouter;