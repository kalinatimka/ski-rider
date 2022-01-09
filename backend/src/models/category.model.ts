import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';

class DBCategory extends Model {}

DBCategory.init({
    idCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.TEXT
}, {
    sequelize: db,
    modelName: 'category',
    tableName: 'category',
    timestamps: false
});

export default DBCategory;
