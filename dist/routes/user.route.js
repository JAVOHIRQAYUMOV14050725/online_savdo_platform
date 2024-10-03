"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/create', _controllers_1.createUser);
userRouter.get('/getAll', _controllers_1.getAllUsers);
userRouter.get('/get/:id', _controllers_1.getUserById);
userRouter.put('/update/:id', _controllers_1.updateUser);
userRouter.delete('/delete/:id', _controllers_1.deleteUser);
//# sourceMappingURL=user.route.js.map