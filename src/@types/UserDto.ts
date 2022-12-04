import { City } from './';

export type UserDto = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: City;
    isAdmin: boolean;
    image: string;
};