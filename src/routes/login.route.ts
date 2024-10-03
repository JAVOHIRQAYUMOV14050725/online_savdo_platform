
import { login } from '@controllers';
import { Router } from 'express';


const loginRouter = Router();

loginRouter.get('/login', login);

export {loginRouter}