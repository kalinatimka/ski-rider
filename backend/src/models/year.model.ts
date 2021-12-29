import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';

class DBYear extends Model {}

DBYear.init({
    idYear: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: DataTypes.INTEGER
}, {
    sequelize: db,
    modelName: 'year',
    tableName: 'year',
    timestamps: false
});

export default DBYear;
