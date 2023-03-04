import { ApiResponse, CreateUserDto, User } from '@/types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true });

export function getRole(): Promise<AxiosResponse<string>> {
    return client.get('/auth/get-role');
}

export function getAllUsers(token: string): Promise<AxiosResponse<ApiResponse<User[]>>> {
    return client.get('/user/all', {
        headers: { Cookie: `token=${token}` },
    });
}

export function createUser(user: CreateUserDto): Promise<AxiosResponse<ApiResponse<User>>> {
    return client.post('/admin/create-user', user);
}
