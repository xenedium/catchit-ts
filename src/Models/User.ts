import { Schema, model } from 'mongoose';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    salt: string;
    password: string;
    createdAt: Date;
    isAdmin: boolean;
    isSuperUser: boolean;
    isBanned: boolean;
    image: string;
}

const UserSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        minlength: 5,
        maxlength: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    },
    salt: {
        type: String,
        required: true,
        minlength: 32,
        maxlength: 32,
    },
    password: {
        type: String,
        required: true,
        minlength: 128,
        maxlength: 128,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperUser: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: null,
    },
});

export default model<IUser>('User', UserSchema);