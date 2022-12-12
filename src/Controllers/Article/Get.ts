import type { Request, Response } from 'express';
import type { ServerJsonResponse } from '../../@types';
import { InternalServerErrorHelper, NotFoundHelper } from '../../@types/Helpers';
import { ArticleHelper } from '../../@types/Helpers/ArticleHelper';
import { HttpStatusCode } from '../../@types/HttpStatusCode';
import { Article } from '../../Models';

export const GetOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const article = await Article
            .findById(id)
            .populate('category')
            .populate('seller')
            .exec();
        if (!article) {
            return res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper('Article not found'));
        }
        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'Article found',
            doc: ArticleHelper(article)
        } as ServerJsonResponse);
    }
    catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') return res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper('Article not found'));
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get article'));
    }
};