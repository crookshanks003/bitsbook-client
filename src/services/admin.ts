import { ApiResponse } from '@/types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/admin', withCredentials: true });

export function deleteUser(id: string): Promise<AxiosResponse<ApiResponse>> {
    return client.post(`/delete-user/${id}`);
}
