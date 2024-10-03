import { Router } from 'express';
import { blogRouter } from './blog.route';
import { productRouter } from './product.route';
import { reviewRouter } from './review.route';
import { cartRouter } from './cart.route';
import { cartItemRouter } from './cartItem.route';
import { categoryRouter } from './category.route';
import { orderRouter } from './order.route';
import { userRouter } from './user.route';
import { orderItemRouter } from './orderItem.route';
import { registerRouter } from './register.route';
import { loginRouter } from './login.route';
import { paymentRouter } from './payment.route';
import { wishlistRouter } from './wishlist.route';
import { couponRouter } from './coupon.route';
import { notificationRouter } from './notification.route';
import { analyticsRouter } from './analytics.route';
import { supportRouter } from './support.route';



const mainRouter = Router();

mainRouter.use('/blogs', blogRouter);
mainRouter.use('/products', productRouter);
mainRouter.use('/reviews', reviewRouter);
mainRouter.use('/carts', cartRouter);
mainRouter.use('/cartItems', cartItemRouter);
mainRouter.use('/categories', categoryRouter);
mainRouter.use('/orders', orderRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/', loginRouter);
mainRouter.use('/', registerRouter);
mainRouter.use('/orderItems', orderItemRouter);
mainRouter.use('/payments', paymentRouter);
mainRouter.use('/wishlists',wishlistRouter)
mainRouter.use('/coupon',couponRouter)
mainRouter.use('/notification',notificationRouter)
mainRouter.use('/analytics',analyticsRouter)
mainRouter.use('/support',supportRouter)

export { mainRouter };


