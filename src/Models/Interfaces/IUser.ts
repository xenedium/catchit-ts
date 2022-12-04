import { City } from '../../@types';

export interface IUser {
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