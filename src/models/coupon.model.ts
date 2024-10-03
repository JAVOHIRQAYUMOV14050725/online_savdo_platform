// src/models/coupon.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { CouponAttributes, CouponCreationAttributes } from '@interfaces';

class Coupon extends Model<CouponAttributes, CouponCreationAttributes> implements CouponAttributes {
  public id!: number;
  public code!: string;
  public discount!: number;
  public expiryDate!: Date;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Coupon.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize: sequelizeConfig,
  tableName: 'coupons',
  timestamps: true,
});

export { Coupon };
