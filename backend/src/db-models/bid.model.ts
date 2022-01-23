import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';
import DBLot from './lot.model';
import DBUser from './user.model';

class DBBid extends Model {}

DBBid.init({
    idBid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: DataTypes.INTEGER,
    date: DataTypes.DATE
}, {
    sequelize: db,
    modelName: 'bid',
    tableName: 'bid',
    timestamps: false
});

DBUser.belongsToMany(DBLot, { through: DBBid, foreignKey: 'idUser', onDelete: 'CASCADE' });
DBLot.belongsToMany(DBUser, { through: DBBid, foreignKey: 'idLot', onDelete: 'CASCADE' });

DBUser.hasMany(DBBid, { foreignKey: 'idUser' });
DBBid.belongsTo(DBUser, { foreignKey: 'idUser' });

// DBLot.hasMany(DBBid, { foreignKey: 'idLot' });
// DBBid.belongsTo(DBLot, { foreignKey: 'idLot' });

export default DBBid;
