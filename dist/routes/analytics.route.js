"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
const express_1 = require("express");
const _controllers_1 = require("../controllers");
const analyticsRouter = (0, express_1.Router)();
exports.analyticsRouter = analyticsRouter;
analyticsRouter.get('/user', _controllers_1.getUserAnalytics);
analyticsRouter.get('/orders', _controllers_1.getOrderAnalytics);
analyticsRouter.get('/products', _controllers_1.getProductSales);
analyticsRouter.get('/site', _controllers_1.getSiteVisits);
//# sourceMappingURL=analytics.route.js.map