import { Types } from 'mongoose';

export type CategoryDto = {
    _id: Types.ObjectId;
    name: string;
    image: string;
}