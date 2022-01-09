import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';
import DBYear from './year.model';

class DBLot extends Model {}

DBLot.init({
    idLot: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    startPrice: DataTypes.INTEGER,
    bidStep: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    idBrand: DataTypes.INTEGER,
    idType: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER,
    idCreator: DataTypes.INTEGER,
    idWinner: DataTypes.INTEGER
}, {
    sequelize: db,
    modelName: 'lot',
    tableName: 'lot',
    timestamps: false
});

DBYear.hasMany(DBLot, { foreignKey: 'idYear' });
DBLot.belongsTo(DBYear, { foreignKey: 'idYear' });


export default DBLot;
