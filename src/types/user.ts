import { UserClub } from './clubs';

export enum Role {
    ADIMIN = 'admin',
    USER = 'user',
}

export interface User {
    clubs: UserClub[];
    createdAt: string;
    email: string;
    name: string;
    role: Role;
    updatedAt: string;
    __v: number;
    _id: string;
}

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: string;
}
