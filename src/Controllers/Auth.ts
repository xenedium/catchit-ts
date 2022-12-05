import type { Request, Response } from 'express';
import { User } from '../Models';
import { HttpStatusCode, type ServerJsonResponse } from '../@types';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { S3LocationHelper, UserHelper } from '../@types/Helpers';

const Register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber, password, city } = req.body;
    const image = req.file as Express.MulterS3.File;

    if (!password || password.length < 8) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: 'Validation failed',
            errors: ['Path `password` is shorter than the minimum allowed length (8).'],
        } as ServerJsonResponse);
    }

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        salt,
        hash,
        city,
        image: S3LocationHelper(image),
    });

    try {
        await user.validate();
    }
    catch (err) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: 'Validation failed',
            errors: [
                ...Object.values(err.errors).map((error: any) => error.message)
            ],
        } as ServerJsonResponse);
    }
    try {
        await user.save();
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: 'Validation failed',
                errors: ['Email or phone number already exists'],
            } as ServerJsonResponse);
        }
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            errors: ['Couldn\'t save user'],
        } as ServerJsonResponse);
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return res.status(HttpStatusCode.CREATED).json({
        statusCode: HttpStatusCode.CREATED,
        message: 'User created',
        user: UserHelper(user),
        token,
    } as ServerJsonResponse);
};

const Login = async (req: Request, res: Response) => {
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

        return res.status(HttpStatusCode.OK).json({
            statusCode: HttpStatusCode.OK,
            message: 'User logged in',
            user: UserHelper(user),
            token,
        } as ServerJsonResponse);
    }
    catch (err) {
        if (err.message === 'Email or password is incorrect') return res.status(HttpStatusCode.UNAUTHORIZED).json({
            statusCode: HttpStatusCode.UNAUTHORIZED,
            message: 'Unauthorized',
            errors: ['Email or password is incorrect'],
        } as ServerJsonResponse);
        if (err.message === 'Invalid email or password') return res.status(HttpStatusCode.BAD_REQUEST).json({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: 'Validation failed',
            errors: ['Invalid email or password'],
        } as ServerJsonResponse);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            errors: ['Couldn\'t find user'],
        } as ServerJsonResponse);
    }
};

export default {
    Register,
    Login
};