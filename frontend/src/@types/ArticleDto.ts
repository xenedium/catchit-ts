import type { CategoryDto, City, UserDto } from './';

export type ArticleDto = {
    _id: string;
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