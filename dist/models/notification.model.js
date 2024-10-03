"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
// src/models/notification.model.ts
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Notification extends sequelize_1.Model {
}
exports.Notification = Notification;
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('SMS', 'email', 'push'),
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sentAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    isRead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'notifications',
    timestamps: true,
});
//# sourceMappingURL=notification.model.js.map