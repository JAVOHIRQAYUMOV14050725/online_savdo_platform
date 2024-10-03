"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Shipping extends sequelize_1.Model {
}
exports.Shipping = Shipping;
Shipping.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shippingMethod: {
        type: sequelize_1.DataTypes.ENUM('standard', 'express', 'overnight'),
        allowNull: false,
    },
    shippingStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
        allowNull: false,
    },
    shippingDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'shippings',
    timestamps: true,
});
//# sourceMappingURL=shipping.model.js.map