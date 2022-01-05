import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserService from '../services/user.service';

const authRouter = Router();
const userService = new UserService();

authRouter.post(
    '/login',
    async (req: Request, res: Response) => {
        const user = await userService.findUserByEmail(req.body.mail);

        if (!user) {
            res.status(400).send('No users with such mail');
        }

        const password = user.getDataValue('password');
        if (password !== req.body.password) {
            res.status(400).send('Incorrect password for this mail!');
        }

        const token = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
        res.send({
            id: user.getDataValue('idUser'),
            login: user.getDataValue('login'),
            avatar: user.getDataValue('avatar'),
            token
        });
    }
);

export default authRouter;
