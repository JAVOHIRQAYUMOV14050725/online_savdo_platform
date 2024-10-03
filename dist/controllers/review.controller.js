"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewById = exports.getReviewsByProductId = exports.getAllReviews = exports.createReview = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId, rating, comment } = req.body;
    if (!productId || !userId || rating === undefined) {
        return res.status(400).json({ message: 'Mahsulot ID, Foydalanuvchi ID va baho talab qilinadi' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Baho 1 dan 5 gacha bo\'lishi kerak' });
    }
    try {
        const newReview = yield _models_1.Review.create({ productId, userId, rating, comment });
        const cacheKey = `review_${newReview.id}`;
        yield (0, _utils_1.cacheSet)(cacheKey, newReview); // Cache the new review
        return res.status(201).json(newReview);
    }
    catch (error) {
        console.error('Sharh yaratishda xato:', error);
        return res.status(500).json({ message: 'Sharh yaratishda xato yuz berdi' });
    }
});
exports.createReview = createReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = 'all_reviews';
    try {
        // Check if the reviews are in the cache
        const cachedReviews = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedReviews) {
            return res.status(200).json(cachedReviews); // Return cached reviews
        }
        const reviews = yield _models_1.Review.findAll();
        yield (0, _utils_1.cacheSet)(cacheKey, reviews); // Cache the fetched reviews
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Barcha sharhlarni olishda xato:', error);
        return res.status(500).json({ message: 'Sharhlarni olishda xato yuz berdi' });
    }
});
exports.getAllReviews = getAllReviews;
const getReviewsByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ message: 'Yaroqsiz mahsulot ID' });
    }
    const cacheKey = `reviews_product_${productId}`;
    try {
        const cachedReviews = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedReviews) {
            return res.status(200).json(cachedReviews); // Return cached reviews
        }
        const reviews = yield _models_1.Review.findAll({ where: { productId } });
        yield (0, _utils_1.cacheSet)(cacheKey, reviews); // Cache the fetched reviews
        return res.status(200).json(reviews);
    }
    catch (error) {
        console.error('Sharhlarni olishda xato:', error);
        return res.status(500).json({ message: 'Sharhlarni olishda xato yuz berdi' });
    }
});
exports.getReviewsByProductId = getReviewsByProductId;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
    }
    const cacheKey = `review_${id}`;
    try {
        const cachedReview = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedReview) {
            return res.status(200).json(cachedReview); // Return cached review
        }
        const review = yield _models_1.Review.findByPk(id);
        if (review) {
            yield (0, _utils_1.cacheSet)(cacheKey, review); // Cache the fetched review
            return res.status(200).json(review);
        }
        else {
            return res.status(404).json({ message: 'Sharh topilmadi' });
        }
    }
    catch (error) {
        console.error('Sharhni olishda xato:', error);
        return res.status(500).json({ message: 'Sharhni olishda xato yuz berdi' });
    }
});
exports.getReviewById = getReviewById;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rating, comment } = req.body;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
    }
    if (rating === undefined && comment === undefined) {
        return res.status(400).json({ message: 'Yangilash uchun maydonlar yo\'q' });
    }
    if (rating !== undefined && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Baho 1 dan 5 gacha bo\'lishi kerak' });
    }
    const cacheKey = `review_${id}`;
    try {
        const [updated] = yield _models_1.Review.update({ rating, comment }, {
            where: { id },
        });
        if (updated) {
            const updatedReview = yield _models_1.Review.findByPk(id);
            yield (0, _utils_1.cacheSet)(cacheKey, updatedReview); // Cache the updated review
            return res.status(200).json(updatedReview);
        }
        else {
            return res.status(404).json({ message: 'Sharh topilmadi' });
        }
    }
    catch (error) {
        console.error('Sharhni yangilashda xato:', error);
        return res.status(500).json({ message: 'Sharhni yangilashda xato yuz berdi' });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Yaroqsiz sharh ID' });
    }
    const cacheKey = `review_${id}`;
    try {
        const deleted = yield _models_1.Review.destroy({ where: { id } });
        if (deleted) {
            yield (0, _utils_1.cacheDelete)(cacheKey); // Invalidate the cached review
            return res.status(204).send();
        }
        else {
            return res.status(404).json({ message: 'Sharh topilmadi' });
        }
    }
    catch (error) {
        console.error('Sharhni o\'chirishda xato:', error);
        return res.status(500).json({ message: 'Sharhni o\'chirishda xato yuz berdi' });
    }
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.controller.js.map