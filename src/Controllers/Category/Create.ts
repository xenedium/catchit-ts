import type { Request, Response } from 'express';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';
import { BadRequestHelper, InternalServerErrorHelper } from '../../@types/Helpers';
import { Category } from '../../Models';

export const Create = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const image = req.file as Express.MulterS3.File;

    const category = new Category({
        name,
        description,
        image: image.location,
    });

    try {
        await category.validate();
    }
    catch (error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper(error));
    }

    try {
        await category.save();
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'Category already exists'}));
        }
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not save category'));
    }

    return res.status(HttpStatusCode.CREATED).json({
        statusCode: HttpStatusCode.CREATED,
        message: 'Category created'
    } as ServerJsonResponse);
};