// src/models/notification.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { NotificationAttributes, NotificationCreationAttributes } from '@interfaces';

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public userId!: number;
  public type!: 'SMS' | 'email' | 'push';
  public message!: string;
  public sentAt!: Date;
  public isRead!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('SMS', 'email', 'push'),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize: sequelizeConfig,
  tableName: 'notifications',
  timestamps: true,
});

export { Notification };
