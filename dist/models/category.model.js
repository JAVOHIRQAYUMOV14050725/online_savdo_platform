"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'categories',
    timestamps: true,
});
//# sourceMappingURL=category.model.js.map