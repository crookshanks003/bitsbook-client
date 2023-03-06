import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/auth', withCredentials: true });

export function login(role: string) {
    return client.post('/login', { role });
}
