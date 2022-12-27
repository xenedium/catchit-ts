import type { Types } from 'mongoose';
import { CategoryDto, UserDto, City } from '.';

export type ArticleDto = {
    _id: Types.ObjectId;
    title: string;
    images: string[];
    description: string;
    category: CategoryDto;
    seller: UserDto;
    condition: string;
    price: number;
    quantity: number;
    isSold: boolean;
    city: City;
};