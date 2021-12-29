import '../models/saved-lots.model';
import DBYear from '../models/year.model';
import DBLot from '../models/lot.model';
import DBUser from '../models/user.model';

export default class LotService {
    public async getAllLots() {
        try {
            return await DBLot.findAll({
                include: [{
                    model: DBYear
                }]
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
}
