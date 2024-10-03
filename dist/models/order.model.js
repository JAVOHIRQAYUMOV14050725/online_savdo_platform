"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const _config_1 = require("../config");
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'orders',
    timestamps: true,
});
//# sourceMappingURL=order.model.js.map