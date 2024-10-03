import { Model } from 'sequelize';
import { ShippingAttributes, ShippingCreationAttributes } from '@interfaces';
declare class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> implements ShippingAttributes {
    id: number;
    userId: number;
    orderId: number;
    address: string;
    shippingMethod: 'standard' | 'express' | 'overnight';
    shippingStatus: 'pending' | 'shipped' | 'delivered' | 'canceled';
    shippingDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Shipping };
