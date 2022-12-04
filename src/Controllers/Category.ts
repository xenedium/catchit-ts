import type { Request, Response } from 'express';


const test = async (req: Request, res: Response) => {
    res.send('Hello');
};

export default {
    test,
};