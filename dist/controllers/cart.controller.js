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
exports.deleteCart = exports.updateCart = exports.getCartById = exports.getAllCarts = exports.createCart = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
// Create a new cart
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        // Yangi cart yaratamiz
        const newCart = yield _models_1.Cart.create({ userId });
        // Cache the newly created cart
        yield (0, _utils_1.cacheSet)(`cart:${newCart.id}`, newCart);
        return res.status(201).json(newCart);
    }
    catch (error) {
        console.error('Error creating cart:', error);
        return res.status(500).json({ message: 'Error creating cart' });
    }
});
exports.createCart = createCart;
// Get all carts
const getAllCarts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = 'allCarts';
        const cachedCarts = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCarts) {
            return res.status(200).json({
                success: true,
                message: 'Carts successfully fetched from cache',
                data: cachedCarts
            });
        }
        const carts = yield _models_1.Cart.findAll();
        // Cache the retrieved carts
        yield (0, _utils_1.cacheSet)(cacheKey, carts);
        return res.status(200).json({
            success: true,
            message: 'Carts successfully fetched',
            data: carts
        });
    }
    catch (error) {
        console.error('Error retrieving carts:', error);
        return res.status(500).json({ message: 'Error retrieving carts' });
    }
});
exports.getAllCarts = getAllCarts;
// Get a cart by ID
const getCartById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Cartni ID bo'yicha topamiz
        const cacheKey = `cart:${id}`;
        const cachedCart = yield (0, _utils_1.cacheGet)(cacheKey);
        if (cachedCart) {
            return res.status(200).json({
                success: true,
                message: 'Cart successfully fetched from cache',
                data: cachedCart
            });
        }
        const cart = yield _models_1.Cart.findByPk(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Cache the retrieved cart
        yield (0, _utils_1.cacheSet)(cacheKey, cart);
        return res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error retrieving cart:', error);
        return res.status(500).json({ message: 'Error retrieving cart' });
    }
});
exports.getCartById = getCartById;
// Update a cart by ID
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const cart = yield _models_1.Cart.findByPk(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        // Cartni yangilaymiz
        cart.userId = userId !== null && userId !== void 0 ? userId : cart.userId;
        yield cart.save();
        // Update the cache with the new cart data
        yield (0, _utils_1.cacheSet)(`cart:${id}`, cart);
        return res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ message: 'Error updating cart' });
    }
});
exports.updateCart = updateCart;
// Delete a cart by ID
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cart = yield _models_1.Cart.findByPk(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        yield cart.destroy();
        // Optionally, delete the cart from the cache
        yield (0, _utils_1.cacheSet)(`cart:${id}`, null);
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting cart:', error);
        return res.status(500).json({ message: 'Error deleting cart' });
    }
});
exports.deleteCart = deleteCart;
//# sourceMappingURL=cart.controller.js.map