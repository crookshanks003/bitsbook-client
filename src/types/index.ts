export interface ApiResponse<T = any> {
    message: string;
    payload?: T;
    time: number;
}

export interface ApiResponseError {
    message: string;
    payload: {
        message: string;
        meta: { [key: string]: any; tags: string[] };
    };
}

export * from './user';
export * from './clubs';
