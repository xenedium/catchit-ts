import type { Request, Response } from 'express';
import { Article } from '../../Models';
import { BadRequestHelper, InternalServerErrorHelper, S3LocationHelper, ArticleHelper } from '../../@types/Helpers';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';

export const Create = async (req: Request, res: Response) => {
    const { title, description, category, condition, price, quantity, city } = req.body;
    const images = req.files as Express.MulterS3.File[];

    const article = new Article({
        title,
        description,
        category,
        condition,
        price,
        quantity,
        city,
        seller: req.user._id,
        images: images.length > 0 ? images.map((image) => S3LocationHelper(image)) : undefined,
    });

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

    res.status(HttpStatusCode.CREATED).json({
        statusCode: HttpStatusCode.CREATED,
        message: 'Article created successfully',
        doc: ArticleHelper(populatedArticle),
    } as ServerJsonResponse);
};