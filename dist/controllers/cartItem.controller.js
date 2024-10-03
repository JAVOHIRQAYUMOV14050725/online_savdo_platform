"use strict";
// src/controllers/cartItemController.ts
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
exports.deleteCartItem = exports.updateCartItem = exports.getCartItemById = exports.getAllCartItems = exports.createCartItem = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// Create a new cart item
const createCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, productId, quantity } = req.body;
        // Yangi cart item yaratamiz
        const newCartItem = yield _models_1.CartItem.create({ cartId, productId, quantity });
        // Keshga saqlash
        yield (0, _utils_1.cacheSet)(`cartItem:${newCartItem.id}`, newCartItem);
        return res.status(201).json(newCartItem);
    }
    catch (error) {
        console.error('Error creating cart item:', error);
        return res.status(500).json({ message: 'Error creating cart item' });
    }
});
exports.createCartItem = createCartItem;
// Get all cart items
const getAllCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'cartItems';
        // Keshdan ma'lumotni olish
        const cachedCartItems = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCartItems) {
            return res.status(200).json(cachedCartItems);
        }
        const cartItems = yield _models_1.CartItem.findAll();
        // Keshga saqlash
        yield (0, _utils_1.cacheSet)(cacheKey, cartItems);
        return res.status(200).json(cartItems);
    }
    catch (error) {
        console.error('Error retrieving cart items:', error);
        return res.status(500).json({ message: 'Error retrieving cart items' });
    }
});
exports.getAllCartItems = getAllCartItems;
// Get a cart item by ID
const getCartItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Cart itemni ID bo'yicha topamiz
        const cacheKey = `cartItem:${id}`;
        const cachedCartItem = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCartItem) {
            return res.status(200).json(cachedCartItem);
        }
        const cartItem = yield _models_1.CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        // Keshga saqlash
        yield (0, _utils_1.cacheSet)(cacheKey, cartItem);
        return res.status(200).json(cartItem);
    }
    catch (error) {
        console.error('Error retrieving cart item:', error);
        return res.status(500).json({ message: 'Error retrieving cart item' });
    }
});
exports.getCartItemById = getCartItemById;
// Update a cart item by ID
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { cartId, productId, quantity } = req.body;
        const cartItem = yield _models_1.CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        // Cart itemni yangilaymiz
        cartItem.cartId = cartId !== null && cartId !== void 0 ? cartId : cartItem.cartId;
        cartItem.productId = productId !== null && productId !== void 0 ? productId : cartItem.productId;
        cartItem.quantity = quantity !== null && quantity !== void 0 ? quantity : cartItem.quantity;
        yield cartItem.save();
        // Yangilangan cart itemni keshga saqlash
        yield (0, _utils_1.cacheSet)(`cartItem:${cartItem.id}`, cartItem);
        return res.status(200).json(cartItem);
    }
    catch (error) {
        console.error('Error updating cart item:', error);
        return res.status(500).json({ message: 'Error updating cart item' });
    }
});
exports.updateCartItem = updateCartItem;
// Delete a cart item by ID
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cartItem = yield _models_1.CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        yield cartItem.destroy();
        // Keshdan o'chirish
        yield (0, _utils_1.cacheSet)(`cartItem:${id}`, null);
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ message: 'Error deleting cart item' });
    }
});
exports.deleteCartItem = deleteCartItem;
//# sourceMappingURL=cartItem.controller.js.map