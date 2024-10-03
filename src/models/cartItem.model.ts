// src/models/cartItem.ts

import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { CartItemAttributes, CartItemCreationAttributes } from '@interfaces';

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    sequelize:sequelizeConfig,
  tableName: 'cartItems',
  timestamps: true,
});

export { CartItem };
