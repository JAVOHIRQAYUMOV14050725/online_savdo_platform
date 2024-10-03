import { Optional } from 'sequelize';
interface ReviewAttributes {
    id: number;
    productId: number;
    userId: number;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {
}
export { ReviewAttributes, ReviewCreationAttributes };
