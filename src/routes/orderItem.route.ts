
import { createOrderItem, deleteOrderItem, getOrderItemById, getOrderItems, updateOrderItem } from '@controllers';
import { Router } from 'express';


const orderItemRouter = Router();

orderItemRouter.post('/create', createOrderItem);
orderItemRouter.get('/get/:id',getOrderItemById );
orderItemRouter.get('/getAll', getOrderItems);
orderItemRouter.put('/update/:id', updateOrderItem);
orderItemRouter.delete('/delete/:id', deleteOrderItem);

export  {orderItemRouter};
