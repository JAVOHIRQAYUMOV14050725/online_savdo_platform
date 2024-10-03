"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const _config_1 = require("../config");
class Payment extends sequelize_1.Model {
}
exports.Payment = Payment;
Payment.init({
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
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
        allowNull: false,
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
    },
    paymentDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: _config_1.sequelizeConfig,
    tableName: 'payments',
    timestamps: true,
});
//# sourceMappingURL=payment.model.js.map