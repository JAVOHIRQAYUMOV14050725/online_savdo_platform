import { Request, Response } from 'express';
import { User } from '@models';
import bcrypt from 'bcrypt';
import { RegisterBody } from '@interfaces';
import { cacheGet, cacheSet } from '@utils';

// Email formatini tekshirish uchun funksiya
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Parolni tekshirish uchun funksiya
const validatePasswordLength = (password: string): boolean => {
  return password.length >= 8;
};

const validatePassword = (password: string): boolean => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return validatePasswordLength(password) && re.test(password);
};

// Parolni xesh qilish uchun funksiya
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Yangi foydalanuvchi yaratish
export const createUser = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
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
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username allaqachon band qilingan" });
    }

    // Email mavjudligini tekshirish
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Foydalanuvchi allaqachon ro'yxatdan o'tgan" });
    }

    // Parolni xesh qilish
    const passwordHash = await hashPassword(password);

    // Yangi foydalanuvchini yaratish
    const newUser = await User.create({ name, email, username, passwordHash });

    // Yangi foydalanuvchini keshga qo'shish
    await cacheSet(`user_${newUser.id}`, newUser);

    // Barcha foydalanuvchilarni keshga qo'shish
    const cachedUsers = await cacheGet('all_users');
    if (cachedUsers) {
      cachedUsers.push(newUser);
      await cacheSet('all_users', cachedUsers);
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const cachedUsers = await cacheGet('all_users');
    if (cachedUsers) {
      return res.status(200).json(cachedUsers); 
    }

    const users = await User.findAll();

    await cacheSet('all_users', users);

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cachedUser = await cacheGet(`user_${id}`);
    if (cachedUser) {
      return res.status(200).json(cachedUser); 
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    await cacheSet(`user_${id}`, user);

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, username } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    if (username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername && existingUsername.id !== user.id) {
        return res.status(400).json({ message: "Username allaqachon band qilingan" });
      }
      user.username = username;
    }

    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Noto'g'ri email format" });
      }
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== user.id) {
        return res.status(400).json({ message: "Email allaqachon band qilingan" });
      }
      user.email = email;
    }

    // Parol yangilanishi
    if (password) {
      user.passwordHash = await hashPassword(password);
    }
    
    user.name = name ?? user.name;

    await user.save();

    // Yangilangan foydalanuvchini keshga qo'shish
    await cacheSet(`user_${id}`, user);

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    await user.destroy();

    await cacheSet(`user_${id}`, null);

    const cachedUsers = await cacheGet('all_users');
    if (cachedUsers) {
      const updatedUsers = cachedUsers.filter((u: { id: string }) => u.id !== id);
      await cacheSet('all_users', updatedUsers);
    }

    return res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Xatolik yuz berdi, iltimos qayta urinib ko\'ring' });
  }
};

