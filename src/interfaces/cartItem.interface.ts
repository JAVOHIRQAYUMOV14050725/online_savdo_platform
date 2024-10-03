

import { Optional } from 'sequelize';

interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

export { CartItemAttributes, CartItemCreationAttributes };
