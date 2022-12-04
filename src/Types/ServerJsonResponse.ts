export type ServerJsonResponse = {
    statusCode: number;
    message: string;
    errors?: string[];
    docs?: any[];
    totalDocs?: number;
    totalPages?: number;
    page?: number;
    limit?: number;
    previousPage?: number | null;
    nextPage?: number | null;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
};