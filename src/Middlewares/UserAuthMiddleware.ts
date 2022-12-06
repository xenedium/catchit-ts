import type { IUser } from '../Models/Interfaces';
import type { Request, Response, NextFunction } from 'express';
import { type JwtPayload, verify } from 'jsonwebtoken';
import { User } from '../Models';
import { HttpStatusCode, type ServerJsonResponse } from '../@types';
import { JwtExtractorHelper } from '../@types/Helpers';

export const UserAuthMiddleware = (isAdminRequired = false) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = JwtExtractorHelper(req);
        if (!token) throw new Error('Unauthorized');
        const userId = (verify(token, process.env.JWT_SECRET) as JwtPayload).id;
        const user = await User.findById(userId) as IUser;
        if (!user) throw new Error('Unauthorized');
        if (isAdminRequired && !user.isAdmin) throw new Error('Forbidden');
        req.user = user;
        next();
    }
    catch (err) {
        return err.message === 'Unauthorized' || err.message === 'invalid token' ?
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                statusCode: HttpStatusCode.UNAUTHORIZED,
                message: 'Unauthorized',
                errors: ['You must be logged in to access this resource'],
            } as ServerJsonResponse) :
            err.message === 'Forbidden' ?
                res.status(HttpStatusCode.FORBIDDEN).json({
                    statusCode: HttpStatusCode.FORBIDDEN,
                    message: 'Forbidden',
                    errors: ['You don\'t have permission to access this resource'],
                } as ServerJsonResponse) :
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                    errors: ['Couldn\'t find user'],
                } as ServerJsonResponse);
    }
};