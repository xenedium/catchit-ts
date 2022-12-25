import type { Request, Response } from 'express';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';
import { BadRequestHelper, InternalServerErrorHelper, ArticleHelper, S3LocationHelper, NotFoundHelper } from '../../@types/Helpers';
import { Article } from '../../Models';

export const Update = async (req: Request, res: Response) => {
    const { title, description, category, condition, price, quantity, city, isSold } = req.body;
    const images = req.files as Express.MulterS3.File[];

    const article = await Article.findById(req.params.id).exec();

    if (!article) {
        return res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper('Article not found'));
    }
    if (!article.seller._id.equals(req.user._id)) {
        return res.status(HttpStatusCode.FORBIDDEN).json({
            statusCode: HttpStatusCode.FORBIDDEN,
            message: 'You are not allowed to update this article',
        } as ServerJsonResponse);
    }

    article.title = title ?? article.title;
    article.description = description ?? article.description;
    article.category = category ?? article.category;
    article.condition = condition ?? article.condition;
    article.price = price ?? article.price;
    article.quantity = quantity ?? article.quantity;
    article.city = city ?? article.city;
    article.isSold = isSold ?? article.isSold;

    if (images.length > 0) {
        article.images = images.map((image) => S3LocationHelper(image));
    }

    try {
        await article.validate();
    } catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({err: error}));
    }

    try {
        await article.save();
    } catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not save article'));
    }

    const populatedArticle = await Article.findById(article._id).populate('seller').populate('category');

    res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: 'Article updated successfully',
        doc: ArticleHelper(populatedArticle),
    } as ServerJsonResponse);
};