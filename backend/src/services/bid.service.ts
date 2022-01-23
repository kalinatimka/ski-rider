import DBBid from '../db-models/bid.model';
import DBUser from '../db-models/user.model';
// import db from '../data-access/database';

import sequelize from 'sequelize';

export default class BidService {
    public async getAllBids(idLot: string) {
        try {
            return await DBBid.findAll({
                where: {
                    idLot
                },
                order: [
                    ['date', 'DESC']
                ],
                attributes: [
                    ...Object.keys(DBBid.rawAttributes),
                    [sequelize.fn('unix_timestamp', sequelize.col('date')), 'date']
                ],
                include: [{
                    model: DBUser
                }]
            });
        } catch (e) {
            console.error(`Method: "getAllBids". Message: ${e.message}`);
        }
    }

    public async getBid(idBid: string) {
        try {
            return await DBBid.findOne({
                where: {
                    idBid
                },
                attributes: [
                    ...Object.keys(DBBid.rawAttributes),
                    [sequelize.fn('unix_timestamp', sequelize.col('date')), 'date']
                ],
                include: [{
                    model: DBUser
                }]
            });
        } catch (e) {
            console.error(`Method: "getBid". Message: ${e.message}`);
        }
    }

    public async addBid(idUser: string, idLot: string, price: string) {
        try {
            const date = new Date(Date.now()).toISOString();
            return await DBBid.create({
                idUser,
                idLot,
                price,
                date
            });
        } catch (e) {
            console.error(`Method: "addBid". Message: ${e.message}`);
        }
    }
}
