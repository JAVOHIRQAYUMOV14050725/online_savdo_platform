import { sequelizeConfig } from '@config';

import { Model, DataTypes } from 'sequelize';

import { OrderAttributes, OrderCreationAttributes } from '@interfaces';

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public status!: 'pending' | 'completed' | 'cancelled';
  public totalAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
    sequelize:sequelizeConfig,
  tableName: 'orders',
  timestamps: true,
});

export { Order };
