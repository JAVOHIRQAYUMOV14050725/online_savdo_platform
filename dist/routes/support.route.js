"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportRouter = void 0;
const express_1 = require("express");
const _controllers_1 = require("../controllers");
const supportRouter = (0, express_1.Router)();
exports.supportRouter = supportRouter;
supportRouter.post('/create', _controllers_1.createSupportRequest);
supportRouter.get('/getAll', _controllers_1.getAllSupportRequests);
supportRouter.get('/get/:id', _controllers_1.getSupportRequestById);
supportRouter.post('/:id/respond', _controllers_1.respondToSupportRequest);
supportRouter.post('/:id/close', _controllers_1.closeSupportRequest);
supportRouter.delete('/:id', _controllers_1.deleteSupportRequest);
//# sourceMappingURL=support.route.js.map