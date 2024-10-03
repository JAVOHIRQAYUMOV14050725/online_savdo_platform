
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '@controllers';
import { Router } from 'express';


const productRouter = Router();

productRouter.post('/create', createProduct);
productRouter.get('/getAll', getProducts);
productRouter.get('/get/:id', getProductById);
productRouter.put('/update/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);

export  {productRouter};
