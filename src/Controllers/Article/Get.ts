/* eslint-disable no-unused-vars */
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

export const GetMany = async (req: Request, res: Response) => {
    const { category, seller, city, limit, page, search } = req.query;
    const query: any = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    if (seller) query.seller = seller;
    if (city) query.city = city;
    try {
        const articles = await Article
            .find(query)
            .populate('category')
            .populate('seller')
            .skip(page ? Number(page) * Number(limit || 10) : 0)
            .limit(limit ? Number(limit) : 10)
            .exec();
        const docCount = await Article.countDocuments(query);
        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'Articles found',
            totalDocs: articles.length,
            totalPages: Math.ceil(docCount / Number(limit || 10)),
            page: Number(page || 0),
            limit: Number(limit || 10),
            docs: articles.map(article => ArticleHelper(article)),
            hasNextPage: docCount > (Number(page || 0) + 1) * Number(limit || 10),
            hasPrevPage: Number(page || 0) > 0
        } as ServerJsonResponse);
    }
    catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get articles'));
    }

};