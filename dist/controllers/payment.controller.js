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
exports.deletePayment = exports.updatePayment = exports.getPaymentById = exports.getAllPayments = exports.createPayment = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds
// Helper function to handle errors
const handleError = (res, error) => {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: message });
};
// Create a payment
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, orderId, amount, paymentMethod } = req.body;
        // Validate input data
        if (!userId || !orderId || !amount || !paymentMethod) {
            return res.status(400).json({ error: "Kerakli ma'lumotlar to'liq emas" });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: "To'lov miqdori ijobiy bo'lishi kerak" });
        }
        const validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({ error: "Noto'g'ri to'lov usuli tanlangan" });
        }
        const newPayment = yield _models_1.Payment.create({
            userId,
            orderId,
            amount,
            paymentMethod,
            paymentStatus: 'pending',
        });
        yield (0, _utils_1.cacheSet)(`payment:${newPayment.id}`, newPayment, CACHE_EXPIRY);
        return res.status(201).json({ message: "To'lov muvaffaqiyatli yaratildi", payment: newPayment });
    }
    catch (error) {
        handleError(res, error);
        return res.status(500); // Ensure to return a status even in case of error
    }
});
exports.createPayment = createPayment;
// Get all payments
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedPayments = yield (0, _utils_1.cacheGet)('payments');
        if (cachedPayments) {
            return res.status(200).json(cachedPayments);
        }
        const payments = yield _models_1.Payment.findAll();
        yield (0, _utils_1.cacheSet)('payments', payments, CACHE_EXPIRY);
        return res.status(200).json(payments);
    }
    catch (error) {
        handleError(res, error);
        return res.status(500); // Ensure to return a status even in case of error
    }
});
exports.getAllPayments = getAllPayments;
// Get a single payment by ID
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
        }
        const cachedPayment = yield (0, _utils_1.cacheGet)(`payment:${id}`);
        if (cachedPayment) {
            return res.status(200).json(cachedPayment);
        }
        const payment = yield _models_1.Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        yield (0, _utils_1.cacheSet)(`payment:${id}`, payment, CACHE_EXPIRY);
        return res.status(200).json(payment);
    }
    catch (error) {
        handleError(res, error);
        return res.status(500); // Ensure to return a status even in case of error
    }
});
exports.getPaymentById = getPaymentById;
// Update a payment
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
        }
        const validStatuses = ['pending', 'completed', 'failed'];
        if (!validStatuses.includes(paymentStatus)) {
            return res.status(400).json({ error: "Noto'g'ri to'lov holati" });
        }
        const payment = yield _models_1.Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        payment.paymentStatus = paymentStatus;
        yield payment.save();
        yield (0, _utils_1.cacheSet)(`payment:${id}`, payment, CACHE_EXPIRY);
        return res.status(200).json({ message: "To'lov holati yangilandi", payment });
    }
    catch (error) {
        handleError(res, error);
        return res.status(500); // Ensure to return a status even in case of error
    }
});
exports.updatePayment = updatePayment;
// Delete a payment
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "Noto'g'ri to'lov ID" });
        }
        const payment = yield _models_1.Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: "To'lov topilmadi" });
        }
        yield payment.destroy();
        yield (0, _utils_1.cacheDelete)(`payment:${id}`);
        return res.status(200).json({ message: "To'lov o'chirildi" });
    }
    catch (error) {
        handleError(res, error);
        return res.status(500); // Ensure to return a status even in case of error
    }
});
exports.deletePayment = deletePayment;
//# sourceMappingURL=payment.controller.js.map