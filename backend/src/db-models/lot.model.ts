import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';

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
    endDate: DataTypes.DATE,
    image: DataTypes.TEXT,
    idYear: DataTypes.INTEGER,
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

export default DBLot;
