"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const cartItemRouter = (0, express_1.Router)();
exports.cartItemRouter = cartItemRouter;
cartItemRouter.post('/create', _controllers_1.createCartItem);
cartItemRouter.get('/getAll', _controllers_1.getAllCartItems);
cartItemRouter.get('/get/:id', _controllers_1.getCartItemById);
cartItemRouter.put('/update/:id', _controllers_1.updateCartItem);
cartItemRouter.delete('/delete/:id', _controllers_1.deleteCartItem);
//# sourceMappingURL=cartItem.route.js.map