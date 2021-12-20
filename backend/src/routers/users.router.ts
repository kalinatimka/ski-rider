import { Request, Response, Router, NextFunction } from 'express';

import UserService from '../services/user.service';

const usersRouter = Router();
const userService = new UserService();

usersRouter.get(
    '/getAllUsers',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbUsers = await userService.getAllUsers();
            res.send(dbUsers);
        } catch (e) {
            return next(e);
        }
    }
);

export default usersRouter;
