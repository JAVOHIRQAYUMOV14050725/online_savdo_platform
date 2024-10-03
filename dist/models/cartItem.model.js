"use strict";
// src/models/cartItem.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class CartItem extends sequelize_1.Model {
}
exports.CartItem = CartItem;
CartItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
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
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'cartItems',
    timestamps: true,
});
//# sourceMappingURL=cartItem.model.js.map