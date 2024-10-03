import { Model } from 'sequelize';
import { PaymentAttributes, PaymentCreationAttributes } from '@interfaces';
declare class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    id: number;
    userId: number;
    orderId: number;
    amount: number;
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    paymentStatus: 'pending' | 'completed' | 'failed';
    readonly paymentDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Payment };
