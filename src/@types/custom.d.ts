/* eslint-disable no-unused-vars */

declare namespace Express {
    enum City {
        Casablanca = 'Casablanca',
        Rabat = 'Rabat',
        Marrakech = 'Marrakech',
        Fes = 'Fes',
        Tanger = 'Tanger',
        Oujda = 'Oujda',
        Agadir = 'Agadir',
        Tetouan = 'Tetouan',
        Meknes = 'Meknes',
        Safi = 'Safi',
        ElJadida = 'El Jadida',
        Khouribga = 'Khouribga',
        Ouarzazate = 'Ouarzazate',
        Settat = 'Settat',
        SidiKacem = 'Sidi Kacem',
        Kenitra = 'Kenitra',
        Taza = 'Taza',
        Tiznit = 'Tiznit',
        SidiIfni = 'Sidi Ifni',
    }
    interface IUser {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        city: City;
        salt: string;
        hash: string;
        createdAt: Date;
        isAdmin: boolean;
        image: string;
    }
    export interface Request {
        user?: import('mongoose').Document<unknown, any, IUser> & IUser & { _id: import('mongoose').Types.ObjectId };
    }
}