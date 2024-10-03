
import { createWishlist, deleteWishlist, getAllWishlists, getWishlistById, updateWishlist } from '@controllers';
import { Router } from 'express';


const wishlistRouter = Router();

wishlistRouter.post('/create', createWishlist);
wishlistRouter.get('/getAll', getAllWishlists);
wishlistRouter.get('/get/:id', getWishlistById);
wishlistRouter.put('/update/:id', updateWishlist);
wishlistRouter.delete('/delete/:id', deleteWishlist);

export  {wishlistRouter};
