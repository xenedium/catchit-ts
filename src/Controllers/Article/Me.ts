import type { Request, Response } from 'express';
import type { ServerJsonResponse } from '../../@types';
import { InternalServerErrorHelper } from '../../@types/Helpers';
import { ArticleHelper } from '../../@types/Helpers/ArticleHelper';
import { HttpStatusCode } from '../../@types/HttpStatusCode';
import { Article } from '../../Models';

export const Me = async (req: Request, res: Response) => {
    const sold = req.query['sold'] === 'true';
    try {
        const articles = await Article
            .find({ seller: req.user._id, isSold: sold })
            .populate('category')
            .populate('seller')
            .exec();

        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'Success',
            docs: articles.map(article => ArticleHelper(article)),
            totalDocs: articles.length
        } as ServerJsonResponse);
    }
    catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get article'));
    }
};