
import { createCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from '@controllers';
import { Router } from 'express';


const couponRouter = Router();

couponRouter.post('/create', createCoupon);
couponRouter.get('/getAll', getAllCoupons);
couponRouter.get('/get/:id', getCouponById);
couponRouter.put('/update/:id', updateCoupon);
couponRouter.delete('/delete/:id', deleteCoupon);

export  {couponRouter};
