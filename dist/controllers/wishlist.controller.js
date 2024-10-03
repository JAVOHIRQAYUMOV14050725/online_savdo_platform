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
exports.deleteWishlist = exports.updateWishlist = exports.getWishlistById = exports.getAllWishlists = exports.createWishlist = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const createWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const newWishlist = yield _models_1.Wishlist.create({ userId, productId });
        // Yangi wishlistni keshga qo'shamiz
        yield (0, _utils_1.cacheSet)(`wishlist_${newWishlist.id}`, newWishlist);
        return res.status(201).json({ message: "Wishlist muvaffaqiyatli yaratildi", wishlist: newWishlist });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Wishlistni yaratishda xatolik yuz berdi" });
        }
    }
});
exports.createWishlist = createWishlist;
const getAllWishlists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedWishlists = yield (0, _utils_1.cacheGet)('all_wishlists');
        if (cachedWishlists) {
            return res.status(200).json(cachedWishlists);
        }
        const wishlists = yield _models_1.Wishlist.findAll();
        yield (0, _utils_1.cacheSet)('all_wishlists', wishlists);
        return res.json(wishlists);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Wishlistsni olishda xatolik yuz berdi" });
        }
    }
});
exports.getAllWishlists = getAllWishlists;
const getWishlistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cachedWishlist = yield (0, _utils_1.cacheGet)(`wishlist_${id}`);
        if (cachedWishlist) {
            return res.status(200).json(cachedWishlist);
        }
        const wishlist = yield _models_1.Wishlist.findByPk(id);
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist topilmadi" });
        }
        // Wishlistni keshga qo'shamiz
        yield (0, _utils_1.cacheSet)(`wishlist_${id}`, wishlist);
        return res.json(wishlist);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Wishlistni olishda xatolik yuz berdi" });
        }
    }
});
exports.getWishlistById = getWishlistById;
const updateWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { productId } = req.body;
        const wishlist = yield _models_1.Wishlist.findByPk(id);
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist topilmadi" });
        }
        wishlist.productId = productId;
        yield wishlist.save();
        // Yangilangan wishlistni keshga qo'shamiz
        yield (0, _utils_1.cacheSet)(`wishlist_${id}`, wishlist);
        return res.json({ message: "Wishlist yangilandi", wishlist });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Wishlistni yangilashda xatolik yuz berdi" });
        }
    }
});
exports.updateWishlist = updateWishlist;
const deleteWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const wishlist = yield _models_1.Wishlist.findByPk(id);
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist topilmadi" });
        }
        yield wishlist.destroy();
        yield (0, _utils_1.cacheDelete)(`wishlist_${id}`);
        yield (0, _utils_1.cacheDelete)('all_wishlists');
        return res.json({ message: "Wishlist o'chirildi" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "Wishlistni o'chirishda xatolik yuz berdi" });
        }
    }
});
exports.deleteWishlist = deleteWishlist;
//# sourceMappingURL=wishlist.controller.js.map