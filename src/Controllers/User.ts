import type { Request, Response } from 'express';


const register = async (req: Request, res: Response) => {
    console.log(req.body);
    res.send('Hello');
};

export default {
    register,
};