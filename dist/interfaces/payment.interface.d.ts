interface PaymentAttributes {
    id: number;
    userId: number;
    orderId: number;
    amount: number;
    paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentDate: Date;
}
interface PaymentCreationAttributes extends Omit<PaymentAttributes, 'id' | 'paymentDate'> {
}
export { PaymentAttributes, PaymentCreationAttributes };
