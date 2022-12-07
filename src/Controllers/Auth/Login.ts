import type { Request, Response } from 'express';
import { User } from '../../Models';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';
import { pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { BadRequestHelper, InternalServerErrorHelper, UserHelper } from '../../@types/Helpers';

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (typeof email !== 'string' || typeof password !== 'string') throw new Error('Invalid email or password');
        const user = await User.findOne({ email });
        if (!user) throw new Error('Email or password is incorrect');

        const hash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
        if (hash !== user.hash) throw new Error('Email or password is incorrect');

        const token = sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.status(HttpStatusCode.OK)
            .cookie('catchit-token', token, {
                maxAge: 1000 * 60 * 60 * 24,    // 1 day
            })
            .json({
                statusCode: HttpStatusCode.OK,
                message: 'User logged in',
                user: UserHelper(user),
                token,
            } as ServerJsonResponse);
    }
    catch (err) {
        return err.message === 'Email or password is incorrect' ?
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                statusCode: HttpStatusCode.UNAUTHORIZED,
                message: 'Unauthorized',
                errors: ['Email or password is incorrect'],
            } as ServerJsonResponse) :
            err.message === 'Invalid email or password' ?
                res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'Invalid email or password'})) :
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not login user'));
    }
};
