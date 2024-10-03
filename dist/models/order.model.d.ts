import { Model } from 'sequelize';
import { OrderAttributes, OrderCreationAttributes } from '@interfaces';
declare class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    id: number;
    userId: number;
    status: 'pending' | 'completed' | 'cancelled';
    totalAmount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Order };
