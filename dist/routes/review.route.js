"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const reviewRouter = (0, express_1.Router)();
exports.reviewRouter = reviewRouter;
reviewRouter.post('/create', _controllers_1.createReview);
reviewRouter.get('/get/:id', _controllers_1.getReviewById);
reviewRouter.get('/getAll', _controllers_1.getAllReviews);
reviewRouter.get('/getByPro/:productId', _controllers_1.getReviewsByProductId);
reviewRouter.put('/update/:id', _controllers_1.updateReview);
reviewRouter.delete('/delete/:id', _controllers_1.deleteReview);
//# sourceMappingURL=review.route.js.map