import { Request, Response, Router, NextFunction } from 'express';

import LotService from '../services/lot.service';

const lotsRouter = Router();
const lotService = new LotService();

lotsRouter.get(
    '/getAllLots',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbLots = await lotService.getAllLots();
            res.send(dbLots);
        } catch (e) {
            return next(e);
        }
    }
);

lotsRouter.get(
    '/getSavedLots',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbLots = await lotService.getSavedLots();
            res.send(dbLots);
        } catch (e) {
            return next(e);
        }
    }
);

export default lotsRouter;
