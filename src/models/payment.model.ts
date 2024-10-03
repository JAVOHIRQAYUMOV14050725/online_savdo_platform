import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { PaymentAttributes, PaymentCreationAttributes } from '@interfaces';

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number;
  public userId!: number;
  public orderId!: number;
  public amount!: number;
  public paymentMethod!: 'credit_card' | 'paypal' | 'bank_transfer';
  public paymentStatus!: 'pending' | 'completed' | 'failed';
  public readonly paymentDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init({
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
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: sequelizeConfig,
  tableName: 'payments',
  timestamps: true,
});

export { Payment };
