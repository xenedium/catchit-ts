import type { Request, Response } from 'express';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';

export const Logout = async (req: Request, res: Response) => {
    return res.status(HttpStatusCode.OK)
        .clearCookie('catchit-token')
        .json({
            statusCode: HttpStatusCode.OK,
            message: 'User logged out',
        } as ServerJsonResponse);
};
