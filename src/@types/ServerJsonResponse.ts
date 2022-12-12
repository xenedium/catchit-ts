import { UserDto } from './';

export type ServerJsonResponse = {
    statusCode: number;
    message: string;
    errors?: string[];
    doc?: any;
    docs?: any[];
    totalDocs?: number;
    totalPages?: number;
    page?: number;
    limit?: number;
    previousPage?: number | null;
    nextPage?: number | null;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    user?: UserDto;
    token?: string;
};