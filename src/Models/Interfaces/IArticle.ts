import { City } from '../../@types';

export interface IArticle {
    title: string;
    image: string;
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
