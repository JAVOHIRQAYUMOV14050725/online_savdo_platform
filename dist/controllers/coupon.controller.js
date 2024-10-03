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
exports.deleteCoupon = exports.updateCoupon = exports.getCouponById = exports.getAllCoupons = exports.createCoupon = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const _config_1 = require("../config");
// Keshning amal qilish muddati
const CACHE_EXPIRY = 3600; // 1 soat
const createCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, discount, expiryDate, isActive } = req.body;
        const newCoupon = yield _models_1.Coupon.create({
            code,
            discount,
            expiryDate,
            isActive,
        });
        // Yangi couponni keshga saqlash
        yield (0, _utils_1.cacheSet)(`coupon:${newCoupon.id}`, newCoupon, CACHE_EXPIRY);
        res.status(201).json({ message: "Coupon muvaffaqiyatli yaratildi", coupon: newCoupon });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Couponni yaratishda xatolik yuz berdi" });
        }
    }
});
exports.createCoupon = createCoupon;
const getAllCoupons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield _models_1.Coupon.findAll();
        res.json(coupons);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Couponlarni olishda xatolik yuz berdi" });
        }
    }
});
exports.getAllCoupons = getAllCoupons;
const getCouponById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cachedCoupon = yield (0, _utils_1.cacheGet)(`coupon:${id}`);
        if (cachedCoupon) {
            res.json(cachedCoupon); // Removed 'return'
            return; // Ensure the function exits after sending the response
        }
        const coupon = yield _models_1.Coupon.findByPk(id);
        if (!coupon) {
            res.status(404).json({ error: "Coupon topilmadi" });
            return;
        }
        yield (0, _utils_1.cacheSet)(`coupon:${id}`, coupon, CACHE_EXPIRY);
        res.json(coupon);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Couponni olishda xatolik yuz berdi" });
        }
    }
});
exports.getCouponById = getCouponById;
// Couponni yangilash
const updateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, discount, expiryDate, isActive } = req.body;
        const coupon = yield _models_1.Coupon.findByPk(id);
        if (!coupon) {
            res.status(404).json({ error: "Coupon topilmadi" });
            return;
        }
        coupon.code = code;
        coupon.discount = discount;
        coupon.expiryDate = expiryDate;
        coupon.isActive = isActive;
        yield coupon.save();
        // Yangilangan couponni keshga saqlash
        yield (0, _utils_1.cacheSet)(`coupon:${id}`, coupon, CACHE_EXPIRY);
        res.json({ message: "Coupon yangilandi", coupon });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Couponni yangilashda xatolik yuz berdi" });
        }
    }
});
exports.updateCoupon = updateCoupon;
// Couponni o'chirish
const deleteCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const coupon = yield _models_1.Coupon.findByPk(id);
        if (!coupon) {
            res.status(404).json({ error: "Coupon topilmadi" });
            return;
        }
        yield coupon.destroy();
        // O'chirilgan couponni keshdan olib tashlash
        yield _config_1.redis.del(`coupon:${id}`);
        res.json({ message: "Coupon o'chirildi" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Couponni o'chirishda xatolik yuz berdi" });
        }
    }
});
exports.deleteCoupon = deleteCoupon;
//# sourceMappingURL=coupon.controller.js.map