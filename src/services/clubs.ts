import { ApiResponse, Club } from '@/types';
import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/club', withCredentials: true });

export async function getAllClubs(token?: string): Promise<ApiResponse<Club[]>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get<ApiResponse<Club[]>>('/all', config);
    return data;
}

export async function getClubProfile(token?: string): Promise<ApiResponse<Club>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get('/profile', config);
    return data;
}
