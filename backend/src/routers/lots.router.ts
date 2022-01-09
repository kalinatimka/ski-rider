import { Request, Response, Router, NextFunction } from 'express';

import multerMW from '../middlewares/multer';
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

lotsRouter.get(
    '/getLotsByCategory/:categoryId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbLots = await lotService.getLotsByCategory(req.params.categoryId);
            res.send(dbLots);
        } catch (e) {
            return next(e);
        }
    }
);

lotsRouter.post(
    '/addLot',
    multerMW('./uploads/lots').single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dbLots = await lotService.addLot(
                req.body.name,
                req.body.description,
                req.body.startPrice,
                req.body.bidStep,
                req.body.endDate,
                req.file.filename,
                req.body.idYear,
                req.body.idBrand,
                req.body.idType,
                req.body.idCategory,
                req.body.idCreator,
            );
            res.send(dbLots);
        } catch (e) {
            return next(e);
        }
    }
);

export default lotsRouter;
