import { Request, Response, Router, NextFunction } from 'express';
import multerMW from '../middlewares/multer';

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

usersRouter.post(
    '/createUser',
    multerMW('./uploads/avatars').single('avatar'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { mail, login, password, phone } = req.body;

            await userService.createUser(mail, password, login, phone, req.file.filename);
            res.send();
        } catch (e) {
            return next(e);
        }
    }
);

export default usersRouter;
