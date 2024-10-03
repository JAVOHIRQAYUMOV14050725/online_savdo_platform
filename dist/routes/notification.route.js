"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const _controllers_1 = require("../controllers");
const notificationRouter = (0, express_1.Router)();
exports.notificationRouter = notificationRouter;
notificationRouter.post('/create', _controllers_1.createNotification);
notificationRouter.get('/notifications', _controllers_1.getAllNotifications);
notificationRouter.get('/notifications/:id', _controllers_1.getNotificationById);
notificationRouter.patch('/mark/:id/read', _controllers_1.markNotificationAsRead);
notificationRouter.delete('/delete/:id', _controllers_1.deleteNotification);
//# sourceMappingURL=notification.route.js.map