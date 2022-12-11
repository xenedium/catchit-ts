import { Types } from 'mongoose';

export interface ICategory {
    _id: Types.ObjectId;
    name: string;
    image: string;
    createdAt: Date;
    createdBy: string;
}
