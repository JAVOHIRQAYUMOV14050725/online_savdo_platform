
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '@controllers';
import { Router } from 'express';


const orderRouter = Router();

orderRouter.post('/create', createOrder);
orderRouter.get('/getAll', getAllOrders);
orderRouter.get('/get/:id', getOrderById);
orderRouter.put('/update/:id', updateOrder);
orderRouter.delete('/delete/:id', deleteOrder);

export  {orderRouter};
