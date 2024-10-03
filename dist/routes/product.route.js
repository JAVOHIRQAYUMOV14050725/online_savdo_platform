"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.post('/create', _controllers_1.createProduct);
productRouter.get('/getAll', _controllers_1.getProducts);
productRouter.get('/get/:id', _controllers_1.getProductById);
productRouter.put('/update/:id', _controllers_1.updateProduct);
productRouter.delete('/delete/:id', _controllers_1.deleteProduct);
//# sourceMappingURL=product.route.js.map