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
exports.deleteNotification = exports.markNotificationAsRead = exports.getNotificationById = exports.getAllNotifications = exports.createNotification = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)();
const CACHE_EXPIRY = 3600;
// Xabar yaratish
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, type, message, sentAt } = req.body;
        const newNotification = yield _models_1.Notification.create({
            userId,
            type,
            message,
            sentAt,
            isRead: false,
        });
        yield (0, _utils_1.cacheSet)(`notification:${newNotification.id}`, newNotification, CACHE_EXPIRY);
        res.status(201).json({ message: "Xabar muvaffaqiyatli yaratildi", notification: newNotification });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Xabarni yaratishda xatolik yuz berdi" });
        }
    }
});
exports.createNotification = createNotification;
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield _models_1.Notification.findAll();
        res.json(notifications);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Xabarnomalarni olishda xatolik yuz berdi" });
        }
    }
});
exports.getAllNotifications = getAllNotifications;
const getNotificationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cachedNotification = yield (0, _utils_1.cacheGet)(`notification:${id}`);
        if (cachedNotification) {
            res.json(cachedNotification);
            return;
        }
        const notification = yield _models_1.Notification.findByPk(id);
        if (!notification) {
            res.status(404).json({ error: "Xabar topilmadi" });
            return;
        }
        yield (0, _utils_1.cacheSet)(`notification:${id}`, notification, CACHE_EXPIRY);
        res.json(notification);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Xabarni olishda xatolik yuz berdi" });
        }
    }
});
exports.getNotificationById = getNotificationById;
const markNotificationAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield _models_1.Notification.findByPk(id);
        if (!notification) {
            res.status(404).json({ error: "Xabar topilmadi" });
            return;
        }
        notification.isRead = true;
        yield notification.save();
        yield (0, _utils_1.cacheSet)(`notification:${id}`, notification, CACHE_EXPIRY);
        res.json({ message: "Xabar o'qilgan deb belgilandi", notification });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Xabarni o'qilgan deb belgilashda xatolik yuz berdi" });
        }
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield _models_1.Notification.findByPk(id);
        if (!notification) {
            res.status(404).json({ error: "Xabar topilmadi" });
            return;
        }
        yield notification.destroy();
        yield redis.del(`notification:${id}`);
        res.json({ message: "Xabar o'chirildi" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Xabarni o'chirishda xatolik yuz berdi" });
        }
    }
});
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notification.controller.js.map