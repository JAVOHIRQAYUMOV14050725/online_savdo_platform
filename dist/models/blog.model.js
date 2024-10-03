"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Blog extends sequelize_1.Model {
}
exports.Blog = Blog;
Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: _config_1.sequelizeConfig, // `sequelizeConfig`ni `sequelize` sifatida uzatish
    tableName: 'blogs',
    timestamps: true,
});
//# sourceMappingURL=blog.model.js.map