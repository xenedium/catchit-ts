import type { Request, Response } from 'express';
import { User } from '../../Models';
import { HttpStatusCode, type ServerJsonResponse } from '../../@types';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { BadRequestHelper, InternalServerErrorHelper, S3LocationHelper, UserHelper } from '../../@types/Helpers';

export const Register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber, password, city } = req.body;
    const image = req.file as Express.MulterS3.File;

    if (!password || password.length < 8) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'Path `password` is shorter than the minimum allowed length (8).'}));
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
        return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper(err));
    }
    try {
        await user.save();
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(HttpStatusCode.BAD_REQUEST).json(BadRequestHelper({message: 'Email or phone number already exists'}));
        }
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(InternalServerErrorHelper('Could not save user'));
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return res.status(HttpStatusCode.CREATED)
        .cookie('catchit-token', token, {
            maxAge: 1000 * 60 * 60 * 24,    // 1 day
        })
        .json({
            statusCode: HttpStatusCode.CREATED,
            message: 'User created',
            user: UserHelper(user),
            token,
        } as ServerJsonResponse);
};
