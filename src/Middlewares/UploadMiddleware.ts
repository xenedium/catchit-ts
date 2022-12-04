import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3Client } from '../aws-s3-client';

export const UploadMiddleware = (path: string) => multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        contentType(req, file, callback) {
            callback(null, file.mimetype);
        },
        key(req, file, cb) {
            cb(null, `${path}/${Date.now().toString()}-${file.originalname}`);
        }
    })
});