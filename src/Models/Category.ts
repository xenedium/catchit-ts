import { Schema, model } from 'mongoose';
import { ICategory } from './Interfaces';

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    image: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'User',
    },
});

export default model<ICategory>('Category', CategorySchema);