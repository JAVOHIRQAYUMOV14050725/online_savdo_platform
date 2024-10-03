import { Model } from 'sequelize';
import { WishlistAttributes, WishlistCreationAttributes } from '@interfaces';
declare class Wishlist extends Model<WishlistAttributes, WishlistCreationAttributes> implements WishlistAttributes {
    id: number;
    userId: number;
    productId: number;
    readonly addedDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Wishlist };
