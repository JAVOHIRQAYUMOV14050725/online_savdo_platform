
import { createCart, deleteCart, getAllCarts, getCartById, updateCart } from '@controllers';
import { Router } from 'express';


const cartRouter = Router();

cartRouter.post('/create', createCart);
cartRouter.get('/getAll', getAllCarts);
cartRouter.get('/get/:id', getCartById);
cartRouter.put('/update/:id', updateCart);
cartRouter.delete('/delete/:id', deleteCart);

export  {cartRouter};
