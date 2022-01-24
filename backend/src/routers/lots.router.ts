import { Request, Response, Router, NextFunction } from 'express';
import { SearchParamsModel } from 'src/models/search-params.model';

import multerMW from '../middlewares/multer';
import LotService from '../services/lot.service';

const lotsRouter = Router();
const lotService = new LotService();

lotsRouter.get(
    '/getAllLots',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchParams: SearchParamsModel = {
                pageNumber: Number(req.query.pageNumber),
                pageSize: Number(req.query.pageSize),
                propertyName: String(req.query.propertyName),
                order: String(req.query.order)
            };
            const dbLots = await lotService.getAllLots(searchParams);
            res.send({
                lots: dbLots.rows,
                totalPages: Math.ceil(dbLots.count / searchParams.pageSize)
            });
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
            const searchParams: SearchParamsModel = {
                pageNumber: Number(req.query.pageNumber),
                pageSize: Number(req.query.pageSize),
                propertyName: String(req.query.propertyName),
                order: String(req.query.order)
            };
            const dbLots = await lotService.getLotsByCategory(req.params.categoryId, searchParams);
            res.send({
                lots: dbLots.rows,
                totalPages: Math.ceil(dbLots.count / searchParams.pageSize)
            });
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

lotsRouter.get(
    '/getLotFullData/:lotId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lot = await lotService.getLotFullData(req.params.lotId);
            res.send(lot);
        } catch (e) {
            return next(e);
        }
    }
);

export default lotsRouter;
