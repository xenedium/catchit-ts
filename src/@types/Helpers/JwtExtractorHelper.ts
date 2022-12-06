import type { Request } from 'express';

export function JwtExtractorHelper(req: Request): string | null {
    return req.cookies['catchit-token'] || req.headers['Authorization'] || req.headers['authorization'];
}