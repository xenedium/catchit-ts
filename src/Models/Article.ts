import { Schema, model } from 'mongoose';
import { City } from '../Types';

interface IArticle {
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

const ArticleSchema = new Schema<IArticle>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        ref: 'Category',
    },
    seller: {
        type: String,
        required: true,
        ref: 'User',
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000,
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        enum: Object.values(City),
        required: true,
    },
});

export default model<IArticle>('Article', ArticleSchema);