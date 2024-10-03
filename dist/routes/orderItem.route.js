"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const orderItemRouter = (0, express_1.Router)();
exports.orderItemRouter = orderItemRouter;
orderItemRouter.post('/create', _controllers_1.createOrderItem);
orderItemRouter.get('/get/:id', _controllers_1.getOrderItemById);
orderItemRouter.get('/getAll', _controllers_1.getOrderItems);
orderItemRouter.put('/update/:id', _controllers_1.updateOrderItem);
orderItemRouter.delete('/delete/:id', _controllers_1.deleteOrderItem);
//# sourceMappingURL=orderItem.route.js.map