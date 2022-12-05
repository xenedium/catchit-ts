export function S3LocationHelper (file?: Express.MulterS3.File): string | null {
    if (!file) return process.env.DEFAULT_USER_IMAGE;
    if (!process.env.S3_CDN_ENDPOINT) return file.location;
    return `${process.env.S3_CDN_ENDPOINT}/${file.key}`;
}