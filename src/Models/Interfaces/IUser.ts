import { City } from '../../@types';
import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: City;
    salt: string;
    hash: string;
    createdAt: Date;
    isAdmin: boolean;
    image: string;
}