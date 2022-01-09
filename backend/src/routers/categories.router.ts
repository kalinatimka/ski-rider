import { Request, Response, Router, NextFunction } from 'express';

import CategoryService from '../services/category.service';

const categoriesRouter = Router();
const categoryService = new CategoryService();

categoriesRouter.get(
    '/getAllCategories',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbCategories = await categoryService.getAllCategories();
            res.send(dbCategories);
        } catch (e) {
            return next(e);
        }
    }
);

export default categoriesRouter;
