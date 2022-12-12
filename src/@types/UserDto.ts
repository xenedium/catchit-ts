import type { Types } from 'mongoose';
import { City } from './';

export type UserDto = {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: City;
    isAdmin: boolean;
    image: string;
};