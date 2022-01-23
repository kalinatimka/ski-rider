import '../db-models/saved-lots.model';
import DBLot from '../db-models/lot.model';
import DBUser from '../db-models/user.model';
import { SearchParamsModel } from '../models/search-params.model';
import db from '../data-access/database';

import sequelize from 'sequelize';
import BidService from './bid.service';
import CategoryService from './category.service';

export default class LotService {
    public async getLotFullData(idLot: string) {
        try {
            return await db.transaction(async () => {
                const lot = await DBLot.findOne({
                    where: {
                        idLot
                    },
                    attributes: [
                        ...Object.keys(DBLot.rawAttributes),
                        [sequelize.fn('unix_timestamp', sequelize.col('endDate')), 'endDate']
                    ]
                });

                const bidService = new BidService();
                const bids = await bidService.getAllBids(idLot);

                const categoryService = new CategoryService();
                const category = await categoryService.getCategoryById(lot.getDataValue('idCategory'));

                return {
                    lot,
                    bids,
                    category
                };
            });
        } catch (e) {
            console.error(`Method: "getLotFullData". Message: ${e.message}`);
        }
    }

    public async getAllLots() {
        try {
            return await DBLot.findAll({
                attributes: [
                    ...Object.keys(DBLot.rawAttributes),
                    [sequelize.fn('unix_timestamp', sequelize.col('endDate')), 'endDate']
                ]
            });
        } catch (e) {
            console.error(`Method: "getAllLots". Message: ${e.message}`);
        }
    }

    public async getLotsByCategory(idCategory: string, searchParams: SearchParamsModel) {
        try {
            return await DBLot.findAndCountAll({
                where: {
                    idCategory
                },
                attributes: [
                    ...Object.keys(DBLot.rawAttributes),
                    [sequelize.fn('unix_timestamp', sequelize.col('endDate')), 'endDate']
                ],
                limit: searchParams.pageSize,
                offset: searchParams.pageNumber * searchParams.pageSize
            });
        } catch (e) {
            console.error(`Method: "getAllLots". Message: ${e.message}`);
        }
    }

    public async getSavedLots() {
        const idUser = 2;
        try {
            const user = await DBUser.findOne({
                include: [{
                    model: DBLot
                }],
                where: { idUser }
            });
            if (user) {
                return user.get('lots');
            }
            return [];
        } catch (e) {
            console.error(`Method: "getSavedLots". Message: ${e.message}`);
        }
    }

    // eslint-disable-next-line max-params
    public async addLot(
        name: string,
        description: string,
        startPrice: number,
        bidStep: number,
        endDate: number,
        image: string,
        idYear: number,
        idBrand: number,
        idType: number,
        idCategory: number,
        idCreator: number,
    ) {
        try {
            return await DBLot.create({
                name,
                description,
                startPrice,
                bidStep,
                endDate,
                image,
                idYear,
                idBrand,
                idType,
                idCategory,
                idCreator
            });
        } catch (e) {
            console.error('Method: "addLot"');
        }
    }
}
