import { HttpStatusCode } from '../HttpStatusCode';
import type { ServerJsonResponse } from '../ServerJsonResponse';

export function InternalServerErrorHelper(message? : string): ServerJsonResponse {
    return {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors: [
            message ?? 'Internal server error',
        ],
    };
}
