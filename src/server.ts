require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import { connect } from 'mongoose';
import { HttpStatusCode } from './Types';
import router from './router';
import { NotFoundHelper } from './Types/Helpers';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

const buildPath = process.env.NODE_ENV === 'production' ? join(__dirname, 'public') : join(__dirname, '..', 'dist', 'public');

// Logger
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
// JSON body parser
app.use(express.json());


// API Routes
app.use('/api', router);
// Static files & React build
app.use(express.static(buildPath));
// Regex for React routes
app.get(/\/(login|register|account|my-articles|article(s?)|my-favorites|add-article|edit-article)/g, (req, res) => res.sendFile(join(buildPath, 'index.html')));
// 404 route for API routes
app.use('/api/*', (_, res) => res.status(HttpStatusCode.NOT_FOUND).json(NotFoundHelper()));
// 404 route for all other routes
app.get('*', (_, res) => res.status(HttpStatusCode.NOT_FOUND).sendFile(join(buildPath, 'index.html')));


connect(MONGO_URI).then(() => app.listen(PORT));