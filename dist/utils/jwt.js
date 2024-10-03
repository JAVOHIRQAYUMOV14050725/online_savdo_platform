"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sign = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
};
exports.sign = sign;
const verify = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
    catch (error) {
        return error.message;
    }
};
exports.verify = verify;
//# sourceMappingURL=jwt.js.map