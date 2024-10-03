
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelizeConfig } from '@config';
import { ShippingAttributes, ShippingCreationAttributes } from '@interfaces';

class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> implements ShippingAttributes {
  public id!: number;
  public userId!: number;
  public orderId!: number;
  public address!: string;
  public shippingMethod!: 'standard' | 'express' | 'overnight';
  public shippingStatus!: 'pending' | 'shipped' | 'delivered' | 'canceled';
  public shippingDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shipping.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shippingMethod: {
    type: DataTypes.ENUM('standard', 'express', 'overnight'),
    allowNull: false,
  },
  shippingStatus: {
    type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'canceled'),
    allowNull: false,
  },
  shippingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: sequelizeConfig,
  tableName: 'shippings',
  timestamps: true,
});

export { Shipping };
