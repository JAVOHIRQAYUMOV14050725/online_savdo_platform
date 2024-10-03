

import { createPayment, deletePayment, getAllPayments, getPaymentById, updatePayment } from '@controllers';
import { Router } from 'express';


const paymentRouter = Router();

paymentRouter.post('/create', createPayment);
paymentRouter.get('/getAll', getAllPayments);
paymentRouter.get('/get/:id', getPaymentById);
paymentRouter.put('/update/:id', updatePayment);
paymentRouter.delete('/delete/:id', deletePayment);

export  {paymentRouter};
