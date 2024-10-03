"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
exports.loginRouter = loginRouter;
loginRouter.get('/login', _controllers_1.login);
//# sourceMappingURL=login.route.js.map