import { Model } from 'sequelize';
import { CartAttributes, CartCreationAttributes } from '@interfaces';
declare class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    id: number;
    userId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Cart };
