"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const couponRouter = (0, express_1.Router)();
exports.couponRouter = couponRouter;
couponRouter.post('/create', _controllers_1.createCoupon);
couponRouter.get('/getAll', _controllers_1.getAllCoupons);
couponRouter.get('/get/:id', _controllers_1.getCouponById);
couponRouter.put('/update/:id', _controllers_1.updateCoupon);
couponRouter.delete('/delete/:id', _controllers_1.deleteCoupon);
//# sourceMappingURL=coupon.route.js.map