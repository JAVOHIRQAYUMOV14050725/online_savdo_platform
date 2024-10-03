import { sequelizeConfig } from '@config';
import { DataTypes, Model } from 'sequelize';


export class UserAnalytics extends Model {}
UserAnalytics.init({
  totalUsers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activeUsers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  newUsersToday: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize:sequelizeConfig, modelName: 'UserAnalytics' });

export class OrderAnalytics extends Model {}
OrderAnalytics.init({
  totalOrders: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ordersToday: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pendingOrders: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize:sequelizeConfig, modelName: 'OrderAnalytics' });

export class ProductSales extends Model {}
ProductSales.init({
  totalProductsSold: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  salesToday: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bestSellingProduct: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize:sequelizeConfig, modelName: 'ProductSales' });

export class SiteVisits extends Model {}
SiteVisits.init({
  totalVisits: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  uniqueVisitors: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  visitsToday: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize:sequelizeConfig, modelName: 'SiteVisits' });
