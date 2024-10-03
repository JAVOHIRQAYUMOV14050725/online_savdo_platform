
import { Router } from 'express';
import {
  getUserAnalytics,
  getOrderAnalytics,
  getProductSales,
  getSiteVisits,
} from '@controllers';

const analyticsRouter = Router();

analyticsRouter.get('/user', getUserAnalytics);
analyticsRouter.get('/orders', getOrderAnalytics);
analyticsRouter.get('/products', getProductSales);
analyticsRouter.get('/site', getSiteVisits);

export {  analyticsRouter };
