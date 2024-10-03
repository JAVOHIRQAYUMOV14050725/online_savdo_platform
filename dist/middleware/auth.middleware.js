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
exports.verifyToken = void 0;
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const verifyToken = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            if (!token) {
                return res.status(404).send({
                    success: false,
                    message: "🧐 Token not available 🤷‍♂️",
                });
            }
            const decoded = (0, _utils_1.verify)(token);
            const id = decoded.id;
            const user = yield _models_1.User.findByPk(id);
            if (user) {
                req.userId = user.id;
                next();
            }
            else {
                return res.status(403).send({
                    success: false,
                    message: "token error ⚡",
                });
            }
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: error.message,
            });
        }
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.middleware.js.map