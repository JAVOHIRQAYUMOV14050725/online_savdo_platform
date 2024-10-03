"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
// src/models/wishlist.model.ts
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Wishlist extends sequelize_1.Model {
}
exports.Wishlist = Wishlist;
Wishlist.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    addedDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    }
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'wishlists',
    timestamps: true,
});
//# sourceMappingURL=wishlist.model.js.map