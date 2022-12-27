import { ServerJsonResponse } from '..';

export function NotFoundHelper(message?: string, errors?: string[]): ServerJsonResponse {
    return {
        statusCode: 404,
        message: message || 'Not found',
        errors: errors || ['The requested ressource was not found'],
    };
}