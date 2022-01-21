import { Model } from 'sequelize';

import db from '../data-access/database';
import DBLot from './lot.model';
import DBUser from './user.model';

class DBSavedLots extends Model {}

DBSavedLots.init({}, {
    sequelize: db,
    modelName: 'savedLots',
    tableName: 'savedLots',
    timestamps: false
});

DBUser.belongsToMany(DBLot, { through: DBSavedLots, foreignKey: 'idUser', onDelete: 'CASCADE' });
DBLot.belongsToMany(DBUser, { through: DBSavedLots, foreignKey: 'idLot', onDelete: 'CASCADE' });

export default DBSavedLots;
