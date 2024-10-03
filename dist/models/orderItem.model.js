"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'orderItems',
    timestamps: true,
});
//# sourceMappingURL=orderItem.model.js.map