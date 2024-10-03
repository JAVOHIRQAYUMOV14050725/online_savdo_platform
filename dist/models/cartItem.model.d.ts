import { Model } from 'sequelize';
import { CartItemAttributes, CartItemCreationAttributes } from '@interfaces';
declare class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { CartItem };
