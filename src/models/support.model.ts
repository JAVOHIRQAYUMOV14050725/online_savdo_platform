import { sequelizeConfig } from '@config';
import { DataTypes, Model } from 'sequelize';

export class SupportRequest extends Model {
  public id!: number; // `id` maydoni qo'shildi
  public userId!: string;
  public question!: string;
  public status!: 'new' | 'responded' | 'closed';
  public createdAt!: Date;
}

SupportRequest.init({
  id: {
    type: DataTypes.INTEGER, // `id` maydonini INTEGER sifatida belgilang
    autoIncrement: true, // Avtomatik inkrement
    primaryKey: true, // Asosiy kalit sifatida belgilash
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'responded', 'closed'),
    allowNull: false,
    defaultValue: 'new'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, { sequelize: sequelizeConfig, modelName: 'SupportRequest' });

export class SupportResponse extends Model {
  public id!: number; // `id` maydoni qo'shildi
  public requestId!: string;
  public response!: string;
  public respondedAt!: Date;
}

SupportResponse.init({
  id: {
    type: DataTypes.INTEGER, // `id` maydonini INTEGER sifatida belgilang
    autoIncrement: true, // Avtomatik inkrement
    primaryKey: true, // Asosiy kalit sifatida belgilash
  },
  requestId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, { sequelize: sequelizeConfig, modelName: 'SupportResponse' });
