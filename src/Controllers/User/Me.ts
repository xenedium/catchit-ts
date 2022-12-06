import type { Request, Response } from 'express';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';
import { UserHelper } from '../../@types/Helpers';


export const Me = async (req: Request, res: Response) => {
    return res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: 'User found',
        user: UserHelper(req.user),
    } as ServerJsonResponse);
};
