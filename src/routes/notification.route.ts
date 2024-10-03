import { Router } from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
} from '@controllers';


const notificationRouter = Router();


notificationRouter.post('/create', createNotification);
notificationRouter.get('/notifications', getAllNotifications);
notificationRouter.get('/notifications/:id', getNotificationById);
notificationRouter.patch('/mark/:id/read', markNotificationAsRead);
notificationRouter.delete('/delete/:id', deleteNotification);

export { notificationRouter  };
