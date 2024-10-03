import { Request, Response, NextFunction } from "express";
import { User } from "@models";
import { verify } from "@utils";

const verifyToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.token as string | undefined;

      if (!token) {
        return res.status(404).send({
          success: false,
          message: "🧐 Token not available 🤷‍♂️",
        });
      }

      const decoded = verify(token);
      const id = (decoded as { id: number }).id;

      const user = await User.findByPk(id);

      if (user) {
        (req as any).userId = user.id;
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: "token error ⚡",
        });
      }
    } catch (error) {
      return res.status(404).send({
        success: false,
        message: (error as Error).message,
      });
    }
  };
};

export  {verifyToken};
