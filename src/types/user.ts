import { UserClub } from './clubs';

export enum Role {
    ADMIN = 'admin',
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

export interface UpdateUserRoleDto {
    role: string;
    userId: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}
