"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const wishlistRouter = (0, express_1.Router)();
exports.wishlistRouter = wishlistRouter;
wishlistRouter.post('/create', _controllers_1.createWishlist);
wishlistRouter.get('/getAll', _controllers_1.getAllWishlists);
wishlistRouter.get('/get/:id', _controllers_1.getWishlistById);
wishlistRouter.put('/update/:id', _controllers_1.updateWishlist);
wishlistRouter.delete('/delete/:id', _controllers_1.deleteWishlist);
//# sourceMappingURL=wishlist.route.js.map