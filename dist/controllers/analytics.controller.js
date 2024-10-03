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
exports.getSiteVisits = exports.getProductSales = exports.getOrderAnalytics = exports.getUserAnalytics = void 0;
const _models_1 = require("../models");
const _utils_1 = require("../utils");
const getUserAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'userAnalytics';
        const cachedUserAnalytics = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedUserAnalytics) {
            return res.status(200).json({
                success: true,
                message: 'Foydalanuvchi analitik ma\'lumotlari cache\'dan olingan',
                data: cachedUserAnalytics,
            });
        }
        const userAnalytics = yield _models_1.UserAnalytics.findOne();
        if (userAnalytics) {
            yield (0, _utils_1.cacheSet)(cacheKey, userAnalytics);
            return res.status(200).json(userAnalytics);
        }
        else {
            return res.status(404).json({ error: "Foydalanuvchi analitik ma'lumotlari topilmadi" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Foydalanuvchi analitik ma'lumotlarni olishda xatolik yuz berdi" });
    }
});
exports.getUserAnalytics = getUserAnalytics;
const getOrderAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'orderAnalytics';
        const cachedOrderAnalytics = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedOrderAnalytics) {
            return res.status(200).json({
                success: true,
                message: 'Buyurtma analitik ma\'lumotlari cache\'dan olingan',
                data: cachedOrderAnalytics,
            });
        }
        const orderAnalytics = yield _models_1.OrderAnalytics.findOne();
        if (orderAnalytics) {
            yield (0, _utils_1.cacheSet)(cacheKey, orderAnalytics);
            return res.status(200).json(orderAnalytics);
        }
        else {
            return res.status(404).json({ error: "Buyurtma analitik ma'lumotlari topilmadi" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Buyurtma analitik ma'lumotlarni olishda xatolik yuz berdi" });
    }
});
exports.getOrderAnalytics = getOrderAnalytics;
const getProductSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'productSales';
        const cachedProductSales = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedProductSales) {
            return res.status(200).json({
                success: true,
                message: 'Mahsulot sotilishi analitik ma\'lumotlari cache\'dan olingan',
                data: cachedProductSales,
            });
        }
        const productSales = yield _models_1.ProductSales.findOne();
        if (productSales) {
            yield (0, _utils_1.cacheSet)(cacheKey, productSales);
            return res.status(200).json(productSales);
        }
        else {
            return res.status(404).json({ error: "Mahsulot sotilishi analitik ma'lumotlari topilmadi" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Mahsulot sotilishi analitik ma'lumotlarni olishda xatolik yuz berdi" });
    }
});
exports.getProductSales = getProductSales;
const getSiteVisits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'siteVisits';
        const cachedSiteVisits = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedSiteVisits) {
            return res.status(200).json({
                success: true,
                message: 'Saytga tashriflar analitik ma\'lumotlari cache\'dan olingan',
                data: cachedSiteVisits,
            });
        }
        const siteVisits = yield _models_1.SiteVisits.findOne();
        if (siteVisits) {
            yield (0, _utils_1.cacheSet)(cacheKey, siteVisits);
            return res.status(200).json(siteVisits);
        }
        else {
            return res.status(404).json({ error: "Saytga tashriflar analitik ma'lumotlari topilmadi" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Saytga tashriflar analitik ma'lumotlarni olishda xatolik yuz berdi" });
    }
});
exports.getSiteVisits = getSiteVisits;
//# sourceMappingURL=analytics.controller.js.map