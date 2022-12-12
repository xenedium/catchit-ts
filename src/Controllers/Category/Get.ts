import type { Request, Response } from 'express';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';
import { CategoryHelper, InternalServerErrorHelper, NotFoundHelper } from '../../@types/Helpers';
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
            doc: CategoryHelper(category)
        } as ServerJsonResponse);
    }
    catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') return res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper('Category not found'));
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
            docs: categories.map(category => CategoryHelper(category)),
            totalDocs: categories.length
        } as ServerJsonResponse);
    }
    catch (error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not get categories'));
    }
};