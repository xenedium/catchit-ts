import type { Request, Response } from 'express';
import { HttpStatusCode, ServerJsonResponse } from '../../@types';
import { pbkdf2Sync } from 'crypto';
import { BadRequestHelper, InternalServerErrorHelper, UserHelper } from '../../@types/Helpers';


export const Put = async (req: Request, res: Response) => {
    const { firstName, lastName, city, oldPassword, newPassword } = req.body;
    const image = req.file as Express.MulterS3.File;

    if (newPassword) {
        if (newPassword.length < 8) return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'New password must be at least 8 characters long'}));
        const oldPasswordHash = pbkdf2Sync(oldPassword, req.user.salt, 1000, 64, 'sha512').toString('hex');
        if (oldPasswordHash !== req.user.hash) return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'Old password is incorrect'}));
        req.user.hash = pbkdf2Sync(newPassword, req.user.salt, 1000, 64, 'sha512').toString('hex');
    }

    req.user.firstName = firstName || req.user.firstName;
    req.user.lastName = lastName || req.user.lastName;
    req.user.city = city || req.user.city;
    req.user.image = image?.location || req.user.image;

    try {
        await req.user.validate();
    }
    catch(error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: Object.values(error.errors).map((err: any) => err.path).toString()}));
    }

    try {
        await req.user.save();
    }
    catch(error) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper());
    }

    return res.status(HttpStatusCode.OK).json({
        statusCode: HttpStatusCode.OK,
        message: 'User updated successfully',
        user: UserHelper(req.user)
    } as ServerJsonResponse);
};
