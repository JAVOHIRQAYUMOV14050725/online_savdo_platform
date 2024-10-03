"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'reviews',
    timestamps: true,
});
//# sourceMappingURL=review.model.js.map