import { ApiResponse, User } from '@/types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true });

export function getRole(): Promise<AxiosResponse<string>> {
    return client.get('/auth/get-role');
}

export async function getAllUsers(token?: string): Promise<ApiResponse<User[]>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get<ApiResponse<User[]>>('/user/all', config);
    return data;
}
