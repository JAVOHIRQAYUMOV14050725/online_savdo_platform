"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteVisits = exports.ProductSales = exports.OrderAnalytics = exports.UserAnalytics = void 0;
const _config_1 = require("../config");
const sequelize_1 = require("sequelize");
class UserAnalytics extends sequelize_1.Model {
}
exports.UserAnalytics = UserAnalytics;
UserAnalytics.init({
    totalUsers: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    activeUsers: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    newUsersToday: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'UserAnalytics' });
class OrderAnalytics extends sequelize_1.Model {
}
exports.OrderAnalytics = OrderAnalytics;
OrderAnalytics.init({
    totalOrders: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ordersToday: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pendingOrders: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'OrderAnalytics' });
class ProductSales extends sequelize_1.Model {
}
exports.ProductSales = ProductSales;
ProductSales.init({
    totalProductsSold: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    salesToday: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    bestSellingProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'ProductSales' });
class SiteVisits extends sequelize_1.Model {
}
exports.SiteVisits = SiteVisits;
SiteVisits.init({
    totalVisits: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    uniqueVisitors: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    visitsToday: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: _config_1.sequelizeConfig, modelName: 'SiteVisits' });
//# sourceMappingURL=analytics.model.js.map