/* eslint-disable no-unused-vars */
import type { Request, Response } from 'express';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';


export const Put = async (req: Request, res: Response) => {
    const { firstName, lastName, city, oldPassword, newPassword } = req.body;
    const image = req.file as Express.MulterS3.File;
    return res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: 'User updated successfully',
    } as ServerJsonResponse);
};
