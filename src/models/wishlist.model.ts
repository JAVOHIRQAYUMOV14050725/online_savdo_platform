// src/models/wishlist.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { WishlistAttributes, WishlistCreationAttributes } from '@interfaces';


class Wishlist extends Model<WishlistAttributes, WishlistCreationAttributes> implements WishlistAttributes {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public readonly addedDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Wishlist.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  }
}, {
  sequelize: sequelizeConfig,
  tableName: 'wishlists',
  timestamps: true,
});

export { Wishlist };
