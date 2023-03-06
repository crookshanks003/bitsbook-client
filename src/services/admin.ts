import { ApiResponse, Club, CreateClubDto, CreateUserDto, UpdateUserRoleDto, User } from '@/types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/admin', withCredentials: true });

export function deleteUser(id: string): Promise<AxiosResponse<ApiResponse>> {
    return client.post(`/delete-user/${id}`);
}

export function createUser(user: CreateUserDto): Promise<AxiosResponse<ApiResponse<User>>> {
    return client.post('/create-user', user);
}

export function editUserRole(
    user: UpdateUserRoleDto,
): Promise<AxiosResponse<ApiResponse<UpdateUserRoleDto>>> {
    return client.post('/update-user-role', user);
}

export function createClub(club: CreateClubDto): Promise<AxiosResponse<ApiResponse<Club>>> {
    return client.post('/create-club', club);
}

export function deleteClub(id: string): Promise<AxiosResponse<ApiResponse>> {
    return client.post(`/delete-club/${id}`);
}
