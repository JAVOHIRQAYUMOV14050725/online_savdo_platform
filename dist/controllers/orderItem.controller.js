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
exports.deleteOrderItem = exports.updateOrderItem = exports.getOrderItemById = exports.getOrderItems = exports.createOrderItem = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds
const createOrderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, productId, quantity, price } = req.body;
    try {
        const newOrderItem = yield _models_1.OrderItem.create({ orderId, productId, quantity, price });
        yield (0, _utils_1.cacheSet)(`orderItem:${newOrderItem.id}`, newOrderItem, CACHE_EXPIRY);
        return res.status(201).json(newOrderItem);
    }
    catch (error) {
        console.error('Error creating order item:', error);
        return res.status(500).json({ message: 'Error creating order item' });
    }
});
exports.createOrderItem = createOrderItem;
const getOrderItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedOrderItems = yield (0, _utils_1.cacheGet)('orderItems');
        if (cachedOrderItems) {
            return res.status(200).json(cachedOrderItems); // Return cached order items if available
        }
        const orderItems = yield _models_1.OrderItem.findAll();
        yield (0, _utils_1.cacheSet)('orderItems', orderItems, CACHE_EXPIRY);
        return res.status(200).json(orderItems);
    }
    catch (error) {
        console.error('Error fetching order items:', error);
        return res.status(500).json({ message: 'Error fetching order items' });
    }
});
exports.getOrderItems = getOrderItems;
const getOrderItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cachedOrderItem = yield (0, _utils_1.cacheGet)(`orderItem:${id}`);
        if (cachedOrderItem) {
            return res.status(200).json(cachedOrderItem); // Return cached order item if available
        }
        const orderItem = yield _models_1.OrderItem.findByPk(id);
        if (orderItem) {
            yield (0, _utils_1.cacheSet)(`orderItem:${id}`, orderItem, CACHE_EXPIRY);
            return res.status(200).json(orderItem);
        }
        else {
            return res.status(404).json({ message: 'Order item not found' });
        }
    }
    catch (error) {
        console.error('Error fetching order item:', error);
        return res.status(500).json({ message: 'Error fetching order item' });
    }
});
exports.getOrderItemById = getOrderItemById;
const updateOrderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { orderId, productId, quantity, price } = req.body;
    try {
        const [updated] = yield _models_1.OrderItem.update({ orderId, productId, quantity, price }, {
            where: { id },
        });
        if (updated) {
            const updatedOrderItem = yield _models_1.OrderItem.findByPk(id);
            yield (0, _utils_1.cacheSet)(`orderItem:${id}`, updatedOrderItem, CACHE_EXPIRY);
            return res.status(200).json(updatedOrderItem);
        }
        else {
            return res.status(404).json({ message: 'Order item not found' });
        }
    }
    catch (error) {
        console.error('Error updating order item:', error);
        return res.status(500).json({ message: 'Error updating order item' });
    }
});
exports.updateOrderItem = updateOrderItem;
const deleteOrderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield _models_1.OrderItem.destroy({
            where: { id },
        });
        if (deleted) {
            yield (0, _utils_1.cacheDelete)(`orderItem:${id}`);
            return res.status(204).send(); // No content
        }
        else {
            return res.status(404).json({ message: 'Order item not found' });
        }
    }
    catch (error) {
        console.error('Error deleting order item:', error);
        return res.status(500).json({ message: 'Error deleting order item' });
    }
});
exports.deleteOrderItem = deleteOrderItem;
//# sourceMappingURL=orderItem.controller.js.map