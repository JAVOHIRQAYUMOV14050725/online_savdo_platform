import { Model } from 'sequelize';
import { CouponAttributes, CouponCreationAttributes } from '@interfaces';
declare class Coupon extends Model<CouponAttributes, CouponCreationAttributes> implements CouponAttributes {
    id: number;
    code: string;
    discount: number;
    expiryDate: Date;
    isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Coupon };
