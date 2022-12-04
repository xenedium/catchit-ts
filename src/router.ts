import { Router } from 'express';
import { UserRouter, CategoryRouter, ArticleRouter } from './Routers';

const router = Router();

router.use(UserRouter);
router.use(ArticleRouter);
router.use(CategoryRouter);

export default router;