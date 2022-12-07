import { HttpStatusCode } from '../HttpStatusCode';
import type { ServerJsonResponse } from '../ServerJsonResponse';

export function BadRequestHelper({err, message}: {err?: any, message?: string}): ServerJsonResponse {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: 'Validation failed',
        errors: [
            ...(message ? [message] : Object.values(err.errors).map((error: any) => error.message)),
        ],
    };
}