import { Schema, model } from 'mongoose';
import { City } from '../@types';
import { IArticle } from './Interfaces';

const ArticleSchema = new Schema<IArticle>({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    images: {
        type: [String],
        default: [process.env.DEFAULT_ARTICLE_IMAGE],
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
        type: Schema.Types.ObjectId,
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