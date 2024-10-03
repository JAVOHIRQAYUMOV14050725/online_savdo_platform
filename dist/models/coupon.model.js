"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
// src/models/coupon.model.ts
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Coupon extends sequelize_1.Model {
}
exports.Coupon = Coupon;
Coupon.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'coupons',
    timestamps: true,
});
//# sourceMappingURL=coupon.model.js.map