import { Router } from 'express';
import { UserRouter, CategoryRouter, ArticleRouter, AuthRouter } from './Routers';

const router = Router();

router.use('/user', UserRouter);
router.use('/article', ArticleRouter);
router.use('/category', CategoryRouter);
router.use('/auth', AuthRouter);

export default router;