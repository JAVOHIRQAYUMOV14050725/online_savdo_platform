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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const _config_1 = require("../config");
const requiredFields = ["email", "password"];
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for missing fields
        const missingFields = requiredFields.filter(field => !(field in req.body));
        if (missingFields.length > 0) {
            return res.status(400).send({
                success: false,
                message: `Quyidagi maydonlar to'ldirilmagan: ${missingFields.join(", ")}`,
            });
        }
        const cachedUser = yield (0, _utils_2.cacheGet)(email);
        if (cachedUser) {
            return res.send({
                success: true,
                data: cachedUser.data,
                token: cachedUser.token,
            });
        }
        const user = yield _models_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Foydalanuvchi topilmadi",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).send({
                success: false,
                message: "Parol noto'g'ri",
            });
        }
        const token = (0, _utils_1.sign)({ id: user.id });
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        yield (0, _utils_2.cacheSet)(email, {
            data: userData,
            token: token,
        });
        res.send({
            success: true,
            data: userData,
            token: token,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).send({
            success: false,
            message: 'Server xatosi: ' + error.message,
        });
    }
});
exports.login = login;
//# sourceMappingURL=login.controller.js.map