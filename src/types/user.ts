import { UserClub } from './clubs';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    CLUB = 'club',
}

export interface NavbarProfile {
    createdAt: string;
    name: string;
    role: Role;
    _id: string;
    version: number;
}

interface BaseUser {
    createdAt: string;
    email: string;
    name: string;
    role: Role;
    updatedAt: string;
    version: number;
    _id: string;
}

export interface User extends BaseUser {
    clubs: UserClub[];
}

export interface PopulatedUser extends BaseUser {
    clubs: {
        clubId: {
            _id: string;
            name: string;
            userName: string;
            description: string;
            createdAt: Date;
            __v: 0;
        };
        createdAt: Date;
        role: string;
        _id: string;
    }[];
}

export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: Role;
}

export interface UpdateUserRoleDto {
    role: string;
    userId: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface ClubLoginDto {
    userName: string;
    password: string;
}
