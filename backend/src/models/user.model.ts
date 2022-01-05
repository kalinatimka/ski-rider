import { DataTypes, Model } from 'sequelize';

import db from '../data-access/database';

class DBUser extends Model {}

DBUser.init({
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mail: DataTypes.TEXT,
    login: DataTypes.TEXT,
    password: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    avatar: DataTypes.TEXT
}, {
    sequelize: db,
    modelName: 'user',
    tableName: 'user',
    timestamps: false
});

export default DBUser;
