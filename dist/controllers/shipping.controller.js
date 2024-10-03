"use strict";
// src/controllers/shipping.controller.ts
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
exports.deleteShipping = exports.updateShipping = exports.getShippingById = exports.getAllShippings = exports.createShipping = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// To'lov yaratish
const createShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, orderId, address, shippingMethod } = req.body;
        const newShipping = yield _models_1.Shipping.create({
            userId,
            orderId,
            address,
            shippingMethod,
            shippingStatus: 'pending',
        });
        // Cache the new shipping record
        yield (0, _utils_1.cacheSet)(`shipping_${newShipping.id}`, newShipping);
        return res.status(201).json({ message: "Yetkazib berish muvaffaqiyatli yaratildi", shipping: newShipping });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Yetkazib berishni yaratishda xatolik yuz berdi" });
        }
    }
});
exports.createShipping = createShipping;
// Barcha yetkazib berishlarni olish
const getAllShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = 'all_shippings';
    try {
        // Check cache first
        const cachedShippings = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedShippings) {
            return res.json(cachedShippings); // Return cached results
        }
        const shippings = yield _models_1.Shipping.findAll();
        yield (0, _utils_1.cacheSet)(cacheKey, shippings); // Cache the fetched results
        return res.json(shippings);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Yetkazib berishlarni olishda xatolik yuz berdi" });
        }
    }
});
exports.getAllShippings = getAllShippings;
// Yetkazib berishni ID bo'yicha olish
const getShippingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cacheKey = `shipping_${id}`;
    try {
        // Check cache first
        const cachedShipping = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedShipping) {
            return res.json(cachedShipping); // Return cached result
        }
        const shipping = yield _models_1.Shipping.findByPk(id);
        if (!shipping) {
            return res.status(404).json({ error: "Yetkazib berish topilmadi" });
        }
        yield (0, _utils_1.cacheSet)(cacheKey, shipping); // Cache the fetched shipping record
        return res.json(shipping);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Yetkazib berishni olishda xatolik yuz berdi" });
        }
    }
});
exports.getShippingById = getShippingById;
// Yetkazib berishni yangilash
const updateShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { shippingStatus } = req.body;
    try {
        const shipping = yield _models_1.Shipping.findByPk(id);
        if (!shipping) {
            return res.status(404).json({ error: "Yetkazib berish topilmadi" });
        }
        shipping.shippingStatus = shippingStatus;
        yield shipping.save();
        // Invalidate the cache
        yield (0, _utils_1.cacheDelete)(`shipping_${id}`);
        yield (0, _utils_1.cacheSet)(`shipping_${id}`, shipping); // Optionally cache the updated shipping
        return res.json({ message: "Yetkazib berish holati yangilandi", shipping });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Yetkazib berish holatini yangilashda xatolik yuz berdi" });
        }
    }
});
exports.updateShipping = updateShipping;
// Yetkazib berishni o'chirish
const deleteShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const shipping = yield _models_1.Shipping.findByPk(id);
        if (!shipping) {
            return res.status(404).json({ error: "Yetkazib berish topilmadi" });
        }
        yield shipping.destroy();
        // Invalidate the cache
        yield (0, _utils_1.cacheDelete)(`shipping_${id}`);
        // Optionally invalidate all shippings cache
        yield (0, _utils_1.cacheDelete)('all_shippings');
        return res.json({ message: "Yetkazib berish o'chirildi" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Yetkazib berishni o'chirishda xatolik yuz berdi" });
        }
    }
});
exports.deleteShipping = deleteShipping;
//# sourceMappingURL=shipping.controller.js.map