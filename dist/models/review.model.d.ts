import { Model } from 'sequelize';
import { ReviewAttributes, ReviewCreationAttributes } from '@interfaces';
declare class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
    id: number;
    productId: number;
    userId: number;
    rating: number;
    comment?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Review };
