import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
}
