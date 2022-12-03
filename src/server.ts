import express from 'express';
require('dotenv').config();
import morgan from 'morgan';
import { join } from 'path';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

// Serve static files from the React app
app.use(express.static(join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(join(__dirname, 'public', 'index.html')));


app.use('/api/test', (req, res) => {
    res.status(200).json({
        code: 200,
        message: 'ok',
        error: null
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
