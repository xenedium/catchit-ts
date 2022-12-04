import { UserDto } from '../';
import { IUser } from '../../Models/Interfaces/IUser';

export function UserHelper (user: IUser): UserDto {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        city: user.city,
        isAdmin: user.isAdmin,
        image: user.image,
    };
}