import type { Request, Response } from 'express';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';
import { InternalServerErrorHelper, NotFoundHelper } from '../../@types/Helpers';
import { Category } from '../../Models';

export const GetOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await Category
            .findById(id)
            .exec();
        if (!category) {
            return res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper('Category not found'));
        }
        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'Category found',
            data: {
                _id: category._id,
                name: category.name,
                image: category.image,
            }
        } as ServerJsonResponse);
    }
    catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get category'));
    }
};

export const GetMany = async (req: Request, res: Response) => {
    try {
        const categories = await Category
            .find()
            .exec();
        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'Categories found',
            docs: categories.map(category => ({
                _id: category._id,
                name: category.name,
                image: category.image,
            })),
            totalDocs: categories.length
        } as ServerJsonResponse);
    }
    catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get categories'));
    }
};