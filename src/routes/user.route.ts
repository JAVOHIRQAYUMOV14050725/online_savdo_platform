
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '@controllers';
import { Router } from 'express';


const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.get('/getAll', getAllUsers);
userRouter.get('/get/:id', getUserById);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

export  {userRouter};
