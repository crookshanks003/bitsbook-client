import { ApiResponse, User, UserLoginDto } from '@/types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/auth', withCredentials: true });

export function login(creds: UserLoginDto) {
    return client.post('/login', creds);
}

export function logout() {
    return client.post('/logout');
}

export async function getUserProfile(): Promise<AxiosResponse<ApiResponse<User>>> {
    return client.get('/profile');
}

export function getRole(): Promise<AxiosResponse<string>> {
    return client.get('/get-role');
}
