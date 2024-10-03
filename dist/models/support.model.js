"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportResponse = exports.SupportRequest = void 0;
const _config_1 = require("../config");
const sequelize_1 = require("sequelize");
class SupportRequest extends sequelize_1.Model {
}
exports.SupportRequest = SupportRequest;
SupportRequest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // `id` maydonini INTEGER sifatida belgilang
        autoIncrement: true, // Avtomatik inkrement
        primaryKey: true, // Asosiy kalit sifatida belgilash
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    question: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('new', 'responded', 'closed'),
        allowNull: false,
        defaultValue: 'new'
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'SupportRequest' });
class SupportResponse extends sequelize_1.Model {
}
exports.SupportResponse = SupportResponse;
SupportResponse.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // `id` maydonini INTEGER sifatida belgilang
        autoIncrement: true, // Avtomatik inkrement
        primaryKey: true, // Asosiy kalit sifatida belgilash
    },
    requestId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    response: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    respondedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'SupportResponse' });
//# sourceMappingURL=support.model.js.map