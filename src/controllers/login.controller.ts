import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models";
import { sign } from "@utils";
import { LoginBody } from "@interfaces";
import { cacheSet, cacheGet } from "@utils";

const requiredFields = ["email", "password"];

const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
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

    const cachedUser = await cacheGet(email);
    if (cachedUser) {
      return res.send({
        success: true,
        data: cachedUser.data,
        token: cachedUser.token,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Foydalanuvchi topilmadi",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Parol noto'g'ri",
      });
    }

    const token = sign({ id: user.id });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    await cacheSet(email, {
      data: userData,
      token: token,
    });

    res.send({
      success: true,
      data: userData,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
      success: false,
      message: 'Server xatosi: ' + (error as Error).message,
    });
  }
};

export { login };
