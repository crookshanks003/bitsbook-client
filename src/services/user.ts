import { ApiResponse, User } from '@/types';
import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/user', withCredentials: true });

export async function getAllUsers(token?: string): Promise<ApiResponse<User[]>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get<ApiResponse<User[]>>('/all', config);
    return data;
}
