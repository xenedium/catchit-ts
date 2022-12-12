import type { Types } from 'mongoose';
import { CategoryDto } from './CategoryDto';
import { City } from './City';
import { UserDto } from './UserDto';

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