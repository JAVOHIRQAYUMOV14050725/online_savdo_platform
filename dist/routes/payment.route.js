"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const paymentRouter = (0, express_1.Router)();
exports.paymentRouter = paymentRouter;
paymentRouter.post('/create', _controllers_1.createPayment);
paymentRouter.get('/getAll', _controllers_1.getAllPayments);
paymentRouter.get('/get/:id', _controllers_1.getPaymentById);
paymentRouter.put('/update/:id', _controllers_1.updatePayment);
paymentRouter.delete('/delete/:id', _controllers_1.deletePayment);
//# sourceMappingURL=payment.route.js.map