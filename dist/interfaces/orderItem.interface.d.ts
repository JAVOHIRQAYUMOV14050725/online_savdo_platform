import { Optional } from 'sequelize';
interface OrderItemAttributes {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {
}
export { OrderItemAttributes, OrderItemCreationAttributes };
