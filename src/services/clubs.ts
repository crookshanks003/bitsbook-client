import { ApiResponse, Club, ClubMember, DashboardData, User } from '@/types';
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

export async function getClubInfo(id: string) {
    const { data } = await client.get(`/${id}`);
    return data;
}

export async function getClubMembers(): Promise<ApiResponse<ClubMember[]>> {
    const { data } = await client.get('/members');
    return data;
}

export async function getDashboardData(): Promise<ApiResponse<DashboardData>> {
    const { data } = await client.get('/dashboard');
    return data;
}

export async function addMemberToClub(userId: string, role = 'member'): Promise<ApiResponse> {
    const { data } = await client.post('/add-club-member', { userId, role });
    return data;
}

export async function removeMemberFromClub(userId: string): Promise<ApiResponse> {
    const { data } = await client.post('/remove-club-member', { userId });
    return data;
}

export async function getUserList(): Promise<ApiResponse<User[]>> {
    const { data } = await client.get('/user-list');
    return data;
}
