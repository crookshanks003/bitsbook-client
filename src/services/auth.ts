import { ApiResponse, ClubLoginDto, NavbarProfile, UserLoginDto } from '@/types';
import axios from 'axios';
import { serverUrl } from '.';

const client = axios.create({ baseURL: `${serverUrl}/auth`, withCredentials: true });

export function login(creds: UserLoginDto) {
    return client.post('/login', creds);
}

export function clubLogin(creds: ClubLoginDto) {
    return client.post('/club-login', creds);
}

export function logout() {
    return client.post('/logout');
}

export async function getNavbarProfile(token?: string): Promise<ApiResponse<NavbarProfile>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get('/profile', config);
    return data;
}

export async function getRole(token?: string): Promise<string> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get('/get-role', config);
    return data;
}
