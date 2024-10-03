"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const cartRouter = (0, express_1.Router)();
exports.cartRouter = cartRouter;
cartRouter.post('/create', _controllers_1.createCart);
cartRouter.get('/getAll', _controllers_1.getAllCarts);
cartRouter.get('/get/:id', _controllers_1.getCartById);
cartRouter.put('/update/:id', _controllers_1.updateCart);
cartRouter.delete('/delete/:id', _controllers_1.deleteCart);
//# sourceMappingURL=cart.route.js.map