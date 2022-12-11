import { City } from '../../@types';
import { Types } from 'mongoose';

export interface IArticle {
    _id: Types.ObjectId;
    title: string;
    images: string[];
    description: string;
    category: string;
    seller: string;
    condition: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    isSold: boolean;
    city: City;
}
