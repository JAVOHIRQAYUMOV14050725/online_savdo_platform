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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)(); // Create a Redis client
const CACHE_EXPIRY = 3600; // Cache expiry time in seconds
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, status, totalAmount } = req.body;
        const newOrder = yield _models_1.Order.create({ userId, status, totalAmount });
        yield (0, _utils_1.cacheSet)(`order:${newOrder.id}`, newOrder, CACHE_EXPIRY);
        return res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Error creating order' });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedOrders = yield (0, _utils_1.cacheGet)('orders');
        if (cachedOrders) {
            return res.status(200).json(cachedOrders);
        }
        const orders = yield _models_1.Order.findAll();
        // Cache the fetched orders
        yield (0, _utils_1.cacheSet)('orders', orders, CACHE_EXPIRY);
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ message: 'Error retrieving orders' });
    }
});
exports.getAllOrders = getAllOrders;
// Get an order by ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if the order is cached
        const cachedOrder = yield (0, _utils_1.cacheGet)(`order:${id}`);
        if (cachedOrder) {
            return res.status(200).json(cachedOrder); // Return cached order if available
        }
        // Find the order by ID
        const order = yield _models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Cache the fetched order
        yield (0, _utils_1.cacheSet)(`order:${id}`, order, CACHE_EXPIRY);
        return res.status(200).json(order);
    }
    catch (error) {
        console.error('Error retrieving order:', error);
        return res.status(500).json({ message: 'Error retrieving order' });
    }
});
exports.getOrderById = getOrderById;
// Update an order by ID
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId, status, totalAmount } = req.body;
        const order = yield _models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order
        order.userId = userId !== null && userId !== void 0 ? userId : order.userId;
        order.status = status !== null && status !== void 0 ? status : order.status;
        order.totalAmount = totalAmount !== null && totalAmount !== void 0 ? totalAmount : order.totalAmount;
        yield order.save();
        // Update the cached order
        yield (0, _utils_1.cacheSet)(`order:${id}`, order, CACHE_EXPIRY);
        return res.status(200).json(order);
    }
    catch (error) {
        console.error('Error updating order:', error);
        return res.status(500).json({ message: 'Error updating order' });
    }
});
exports.updateOrder = updateOrder;
// Delete an order by ID
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield _models_1.Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        yield order.destroy();
        // Delete the cached order
        yield (0, _utils_1.cacheDelete)(`order:${id}`);
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'Error deleting order' });
    }
});
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.controller.js.map