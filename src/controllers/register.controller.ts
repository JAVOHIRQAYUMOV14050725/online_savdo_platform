import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '@models';
import { sign } from '@utils';
import { RegisterBody } from '@interfaces';

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePasswordLength = (password: string): boolean => {
  return password.length >= 8;
};

const validatePassword = (password: string): boolean => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return validatePasswordLength(password) && re.test(password);
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Kerakli maydonlar ro'yxati
const requiredFields = ["name", "email", "username", "password"];

// Register funksiyasi
const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
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
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).send({
        success: false,
        message: "Bu email allaqachon ro'yxatdan o'tgan.",
      });
    }

    // Username mavjudligini tekshirish
    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).send({
        success: false,
        message: "Bu username allaqachon ishlatilgan.",
      });
    }

    // Parolni xesh qilish
    const passwordHash = await hashPassword(password);

    // Foydalanuvchini yaratish
    const user = await User.create({ name, email, username, passwordHash });

    // Token yaratish
    const token = sign({ id: user.id });

    // Muvaffaqiyatli javob yuborish
    return res.send({
      success: true,
      data: user,
      token: token
    });
  } catch (error) {
    // Xatolik xabarini yuborish
    return res.status(500).send({
      success: false,
      message: (error as Error).message,
    });
  }
};

export { register };
