import axios, { AxiosResponse } from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true });

export function getRole(): Promise<AxiosResponse<string>> {
    return client.get('/auth/get-role');
}
