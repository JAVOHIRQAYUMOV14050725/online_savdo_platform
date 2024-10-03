"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const registerRouter = (0, express_1.Router)();
exports.registerRouter = registerRouter;
registerRouter.get('/register', _controllers_1.register);
//# sourceMappingURL=register.route.js.map