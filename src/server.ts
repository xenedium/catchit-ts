require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import router from './router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { join } from 'path';
import { connect } from 'mongoose';
import { HttpStatusCode } from './@types';
import { NotFoundHelper } from './@types/Helpers';

// verify that the required environment variables are set
if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');
if (!process.env.S3_REGION) throw new Error('S3_REGION is not defined');
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
if (!process.env.S3_ENDPOINT) throw new Error('S3_ENDPOINT is not defined');
if (!process.env.S3_BUCKET_NAME) throw new Error('S3_BUCKET_NAME is not defined');
if (!process.env.AWS_S3_ACCESS_KEY_ID) throw new Error('AWS_S3_ACCESS_KEY_ID is not defined');
if (!process.env.AWS_S3_SECRET_ACCESS_KEY) throw new Error('AWS_S3_SECRET_ACCESS_KEY is not defined');

// resolve the path to the public directory
const buildPath = process.env.NODE_ENV === 'production' ? join(__dirname, 'public') : join(__dirname, '..', 'dist', 'public');

// Clients
const app = express();

// Middleware: Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
// Middleware: application/json parser
app.use(express.json());
// Middleware: application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));
// Middleware: cookie parser
app.use(cookieParser(process.env.JWT_SECRET));
// Middleware: CORS
app.use(cors({
    origin: '*',
    credentials: true
}));

// API Routes
app.use('/api', router);
// Static files & React build
app.use(express.static(buildPath));
// Regex for React routes
app.get(/\/(login|register|account|my-articles|article(s?)|my-favorites|add-article|edit-article)/g, (_, res) => res.sendFile(join(buildPath, 'index.html')));
// 404 route for API routes (Will return a JSON response)
app.use('/api/*', (_, res) => res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper()));
// 404 route for all other non-API routes (React routes) (Will return a HTML response)
app.get('*', (_, res) => res.status(HttpStatusCode.NOT_FOUND).sendFile(join(buildPath, 'index.html')));

// Connect to MongoDB and start the server
// eslint-disable-next-line no-console
connect(process.env.MONGO_URI).then(() => app.listen(process.env.PORT || 3000, () => console.log(`Server started on http://localhost:${process.env.PORT || 3000}`)));