import { City } from '../../@types';
import { Types } from 'mongoose';
import { ICategory, IUser } from '.';

export interface IArticle {
    _id: Types.ObjectId;
    title: string;
    images: string[];
    description: string;
    category: Types.ObjectId | ICategory;
    seller: Types.ObjectId | IUser;
    condition: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    isSold: boolean;
    city: City;
}
