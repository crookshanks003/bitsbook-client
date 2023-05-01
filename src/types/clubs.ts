import { Role } from './user';

export interface UserClub {
    clubId: string;
    role: string;
    _id: string;
}

export interface Member {
    userId: string;
    role: string;
    _id: string;
}

export interface Club {
    createdAt: string;
    description: string;
    members: Member[];
    name: string;
    userName: string;
    __v: number;
    _id: string;
}

export interface ClubMember {
    role: string;
    userId: {
        createdAt: string;
        email: string;
        name: string;
        role: Role;
        updatedAt: string;
        version: number;
        __v: number;
        _id: string;
    };
    createdAt: string;
}

export interface DashboardData {
    members: number;
    interactions: number;
    posts: number;
}

export interface CreateClubDto {
    name: string;
    userName: string;
    password: string;
    description: string;
}
