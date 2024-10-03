"use strict";
// src/controllers/support.controller.ts
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
exports.deleteSupportRequest = exports.closeSupportRequest = exports.respondToSupportRequest = exports.getSupportRequestById = exports.getAllSupportRequests = exports.createSupportRequest = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// Murojaat yaratish
const createSupportRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, question } = req.body;
        const newRequest = yield _models_1.SupportRequest.create({
            userId,
            question,
        });
        // Keshda yangi murojaatni saqlash
        yield (0, _utils_1.cacheSet)(`support_request_${newRequest.id}`, newRequest);
        return res.status(201).json({ message: "Murojaat muvaffaqiyatli yuborildi", request: newRequest });
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Murojaatni yaratishda xatolik yuz berdi"
        });
    }
});
exports.createSupportRequest = createSupportRequest;
// Barcha mijoz murojaatlarini olish
const getAllSupportRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = 'all_support_requests';
    try {
        // Keshdan oldin tekshirish
        const cachedRequests = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedRequests) {
            return res.json(cachedRequests); // Keshdan qaytarish
        }
        const requests = yield _models_1.SupportRequest.findAll();
        yield (0, _utils_1.cacheSet)(cacheKey, requests); // Olingan natijalarni keshga saqlash
        return res.json(requests);
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Murojaatlarni olishda xatolik yuz berdi"
        });
    }
});
exports.getAllSupportRequests = getAllSupportRequests;
// Murojaat ID bo'yicha olish
const getSupportRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cacheKey = `support_request_${id}`;
    try {
        // Keshdan oldin tekshirish
        const cachedRequest = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedRequest) {
            return res.json(cachedRequest); // Keshdan qaytarish
        }
        const request = yield _models_1.SupportRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({ error: "Murojaat topilmadi" });
        }
        yield (0, _utils_1.cacheSet)(cacheKey, request); // Olingan murojaatni keshga saqlash
        return res.json(request);
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Murojaatni olishda xatolik yuz berdi"
        });
    }
});
exports.getSupportRequestById = getSupportRequestById;
// Murojaatni javob berilgan deb belgilash
const respondToSupportRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { response } = req.body;
    try {
        const request = yield _models_1.SupportRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({ error: "Murojaat topilmadi" });
        }
        request.status = 'responded';
        yield request.save();
        yield _models_1.SupportResponse.create({
            requestId: id,
            response,
        });
        // Keshni yangilash
        yield (0, _utils_1.cacheDelete)(`support_request_${id}`);
        yield (0, _utils_1.cacheSet)(`support_request_${id}`, request); // Yangilangan murojaatni keshga saqlash
        return res.json({ message: "Murojaatga javob berildi", request });
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Javob berishda xatolik yuz berdi"
        });
    }
});
exports.respondToSupportRequest = respondToSupportRequest;
// Murojaatni yopish
const closeSupportRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const request = yield _models_1.SupportRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({ error: "Murojaat topilmadi" });
        }
        request.status = 'closed';
        yield request.save();
        // Keshni yangilash
        yield (0, _utils_1.cacheDelete)(`support_request_${id}`);
        yield (0, _utils_1.cacheDelete)('all_support_requests'); // Barcha murojaatlar keshini yangilash
        return res.json({ message: "Murojaat yopildi", request });
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Murojaatni yopishda xatolik yuz berdi"
        });
    }
});
exports.closeSupportRequest = closeSupportRequest;
// Murojaatni o'chirish
const deleteSupportRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const request = yield _models_1.SupportRequest.findByPk(id);
        if (!request) {
            return res.status(404).json({ error: "Murojaat topilmadi" });
        }
        yield request.destroy();
        // Keshni yangilash
        yield (0, _utils_1.cacheDelete)(`support_request_${id}`);
        yield (0, _utils_1.cacheDelete)('all_support_requests'); // Barcha murojaatlar keshini yangilash
        return res.json({ message: "Murojaat o'chirildi" });
    }
    catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Murojaatni o'chirishda xatolik yuz berdi"
        });
    }
});
exports.deleteSupportRequest = deleteSupportRequest;
//# sourceMappingURL=support.controller.js.map