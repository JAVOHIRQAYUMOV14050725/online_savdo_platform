import { Optional } from 'sequelize';
interface CartAttributes {
    id: number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {
}
export { CartAttributes, CartCreationAttributes };
