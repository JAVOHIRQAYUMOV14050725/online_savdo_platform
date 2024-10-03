
import { createCartItem, deleteCartItem, getAllCartItems, getCartItemById, updateCartItem } from '@controllers';
import { Router } from 'express';


const cartItemRouter = Router();

cartItemRouter.post('/create', createCartItem);
cartItemRouter.get('/getAll', getAllCartItems);
cartItemRouter.get('/get/:id', getCartItemById);
cartItemRouter.put('/update/:id', updateCartItem);
cartItemRouter.delete('/delete/:id', deleteCartItem);

export  {cartItemRouter};
