import { Model } from 'sequelize';
import { OrderItemAttributes, OrderItemCreationAttributes } from '@interfaces';
declare class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { OrderItem };
