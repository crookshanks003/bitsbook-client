import { ApiResponse } from '@/types';
import { CreatePostDto, Post } from '@/types/post';
import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5000/post', withCredentials: true });

export async function createPost(dto: CreatePostDto): Promise<ApiResponse<Post>> {
    const { data } = await client.post('/create', dto);
    return data;
}

export async function getAllPosts(token?: string): Promise<ApiResponse<Post[]>> {
    const config = token
        ? {
              headers: { Cookie: `token=${token}` },
          }
        : undefined;
    const { data } = await client.get('/all', config);
    return data;
}

export async function getUserFeed(): Promise<ApiResponse<Post[]>> {
    const { data }: { data: ApiResponse<Post[]> } = await client.get('/feed');
    return data;
}

export async function getClubFeed(): Promise<ApiResponse<Post[]>> {
    const { data } = await client.get('/club');
    return data;
}

export async function markInterested(id: string): Promise<ApiResponse> {
    const { data } = await client.post(`/interested/${id}`);
    return data;
}

export async function markUnInterested(id: string): Promise<ApiResponse> {
    const { data } = await client.post(`/un-interested/${id}`);
    return data;
}

export async function addComment(id: string, content: string): Promise<ApiResponse> {
    const { data } = await client.post(`/comment/${id}`, { content });
    return data;
}
