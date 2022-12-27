import type { Request, Response } from 'express';
import { InternalServerErrorHelper, ArticleHelper } from '../../@types/Helpers';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';
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