"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter.post('/create', _controllers_1.createOrder);
orderRouter.get('/getAll', _controllers_1.getAllOrders);
orderRouter.get('/get/:id', _controllers_1.getOrderById);
orderRouter.put('/update/:id', _controllers_1.updateOrder);
orderRouter.delete('/delete/:id', _controllers_1.deleteOrder);
//# sourceMappingURL=order.route.js.map