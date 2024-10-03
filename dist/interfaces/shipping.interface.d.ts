interface ShippingAttributes {
    id: number;
    userId: number;
    orderId: number;
    address: string;
    shippingMethod: 'standard' | 'express' | 'overnight';
    shippingStatus: 'pending' | 'shipped' | 'delivered' | 'canceled';
    shippingDate: Date;
}
interface ShippingCreationAttributes extends Omit<ShippingAttributes, 'id' | 'shippingDate'> {
}
export { ShippingAttributes, ShippingCreationAttributes };
