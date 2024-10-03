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
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const _models_1 = require("../models"); 
const _utils_1 = require("../utils"); 
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
const validatePasswordLength = (password) => {
    return password.length >= 8;
};
const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return validatePasswordLength(password) && re.test(password);
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
// Kerakli maydonlar ro'yxati
const requiredFields = ["name", "email", "username", "password"];
// Register funksiyasi
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, password } = req.body;
        // Ma'lumotlarni to'ldirish
        const missingFields = requiredFields.filter(field => !(field in req.body));
        if (missingFields.length > 0) {
            return res.status(400).send({
                success: false,
                message: `Quyidagi maydonlar to'ldirilmagan: ${missingFields.join(", ")}`,
            });
        }
        // Keraksiz maydonlarni tekshirish
        const validKeys = new Set(requiredFields);
        const invalidFields = Object.keys(req.body).filter(key => !validKeys.has(key));
        if (invalidFields.length > 0) {
            return res.status(400).send({
                success: false,
                message: `Keraksiz maydonlar kiritilgan: ${invalidFields.join(", ")}`,
            });
        }
        // Email formatini tekshirish
        if (!validateEmail(email)) {
            return res.status(400).send({
                success: false,
                message: "Noto'g'ri email formati.",
            });
        }
        // Parolni tekshirish
        if (!validatePassword(password)) {
            return res.status(400).send({
                success: false,
                message: "Parol yetarlicha kuchli emas. (Kamida 8 ta belgidan iborat bo'lishi kerak, katta va kichik harflar, raqamlar va maxsus belgilar bo'lishi kerak.)",
            });
        }
        // Email mavjudligini tekshirish
        const existingUserByEmail = yield _models_1.User.findOne({ where: { email } });
        if (existingUserByEmail) {
            return res.status(400).send({
                success: false,
                message: "Bu email allaqachon ro'yxatdan o'tgan.",
            });
        }
        // Username mavjudligini tekshirish
        const existingUserByUsername = yield _models_1.User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).send({
                success: false,
                message: "Bu username allaqachon ishlatilgan.",
            });
        }
        // Parolni xesh qilish
        const passwordHash = yield hashPassword(password);
        // Foydalanuvchini yaratish
        const user = yield _models_1.User.create({ name, email, username, passwordHash });
        // Token yaratish
        const token = (0, _utils_1.sign)({ id: user.id });
        // Muvaffaqiyatli javob yuborish
        return res.send({
            success: true,
            data: user,
            token: token
        });
    }
    catch (error) {
        // Xatolik xabarini yuborish
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});
exports.register = register;
//# sourceMappingURL=register.controller.js.map