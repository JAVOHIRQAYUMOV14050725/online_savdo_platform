

import { Optional } from 'sequelize';

interface OrderAttributes {
  id: number;
  userId: number;
  status: 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export { OrderAttributes, OrderCreationAttributes };
