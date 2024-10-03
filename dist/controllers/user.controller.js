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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const _models_1 = require("../models"); 
const bcrypt_1 = __importDefault(require("bcrypt"));
const _utils_1 = require("../utils"); 
// Email formatini tekshirish uchun funksiya
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
// Parolni tekshirish uchun funksiya
const validatePasswordLength = (password) => {
    return password.length >= 8;
};
const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return validatePasswordLength(password) && re.test(password);
};
// Parolni xesh qilish uchun funksiya
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return yield bcrypt_1.default.hash(password, saltRounds);
});
// Yangi foydalanuvchi yaratish
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, username } = req.body;
        // Ma'lumotlar to'ldirilishini tekshirish
        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "Hammasi to'ldirilishi kerak" });
        }
        // Email formatini tekshirish
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Noto'g'ri email format" });
        }
        // Parolni tekshirish
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Parol yetarlicha kuchli emas" });
        }
        // Username mavjudligini tekshirish
        const existingUsername = yield _models_1.User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ message: "Username allaqachon band qilingan" });
        }
        // Email mavjudligini tekshirish
        const existingUser = yield _models_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Foydalanuvchi allaqachon ro'yxatdan o'tgan" });
        }
        // Parolni xesh qilish
        const passwordHash = yield hashPassword(password);
        // Yangi foydalanuvchini yaratish
        const newUser = yield _models_1.User.create({ name, email, username, passwordHash });
        // Yangi foydalanuvchini keshga qo'shish
        yield (0, _utils_1.cacheSet)(`user_${newUser.id}`, newUser);
        // Barcha foydalanuvchilarni keshga qo'shish
        const cachedUsers = yield (0, _utils_1.cacheGet)('all_users');
        if (cachedUsers) {
            cachedUsers.push(newUser);
            yield (0, _utils_1.cacheSet)('all_users', cachedUsers);
        }
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedUsers = yield (0, _utils_1.cacheGet)('all_users');
        if (cachedUsers) {
            return res.status(200).json(cachedUsers);
        }
        const users = yield _models_1.User.findAll();
        yield (0, _utils_1.cacheSet)('all_users', users);
        return res.status(200).json(users);
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cachedUser = yield (0, _utils_1.cacheGet)(`user_${id}`);
        if (cachedUser) {
            return res.status(200).json(cachedUser);
        }
        const user = yield _models_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        yield (0, _utils_1.cacheSet)(`user_${id}`, user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password, username } = req.body;
        const user = yield _models_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        if (username) {
            const existingUsername = yield _models_1.User.findOne({ where: { username } });
            if (existingUsername && existingUsername.id !== user.id) {
                return res.status(400).json({ message: "Username allaqachon band qilingan" });
            }
            user.username = username;
        }
        if (email) {
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Noto'g'ri email format" });
            }
            const existingEmail = yield _models_1.User.findOne({ where: { email } });
            if (existingEmail && existingEmail.id !== user.id) {
                return res.status(400).json({ message: "Email allaqachon band qilingan" });
            }
            user.email = email;
        }
        // Parol yangilanishi
        if (password) {
            user.passwordHash = yield hashPassword(password);
        }
        user.name = name !== null && name !== void 0 ? name : user.name;
        yield user.save();
        // Yangilangan foydalanuvchini keshga qo'shish
        yield (0, _utils_1.cacheSet)(`user_${id}`, user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield _models_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }
        yield user.destroy();
        yield (0, _utils_1.cacheSet)(`user_${id}`, null);
        const cachedUsers = yield (0, _utils_1.cacheGet)('all_users');
        if (cachedUsers) {
            const updatedUsers = cachedUsers.filter((u) => u.id !== id);
            yield (0, _utils_1.cacheSet)('all_users', updatedUsers);
        }
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map