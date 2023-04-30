export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
}
export interface Comment {
    userId: string;
    name: string;
    content: string;
}

export interface Post {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    version: number;
    author: { _id: string; name: string };
    visibility: Visibility;
    comments: Comment[];
    interested: string[];
    liked: boolean;
}

export interface CreatePostDto {
    title: string;
    content: string;
    visibility: Visibility;
}
