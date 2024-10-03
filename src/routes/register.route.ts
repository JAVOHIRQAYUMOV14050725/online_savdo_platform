
import { login, register } from '@controllers';
import { Router } from 'express';



const registerRouter = Router();

registerRouter.get('/register', register);


export {registerRouter}
