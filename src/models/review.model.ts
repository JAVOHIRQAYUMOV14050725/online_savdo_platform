

import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { ReviewAttributes, ReviewCreationAttributes } from '@interfaces';

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public productId!: number;
  public userId!: number;
  public rating!: number;
  public comment?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
}, {
    sequelize:sequelizeConfig,
  tableName: 'reviews',
  timestamps: true,
});

export { Review };
