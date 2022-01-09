import '../models/saved-lots.model';
import DBLot from '../models/lot.model';
import DBUser from '../models/user.model';

import sequelize from 'sequelize';

export default class LotService {
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

    public async getLotsByCategory(idCategory: string) {
        try {
            return await DBLot.findAll({
                attributes: [
                    ...Object.keys(DBLot.rawAttributes),
                    [sequelize.fn('unix_timestamp', sequelize.col('endDate')), 'endDate']
                ],
                where: {
                    idCategory
                }
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
