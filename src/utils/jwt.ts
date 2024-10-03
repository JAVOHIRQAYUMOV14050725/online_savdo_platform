import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface Payload {
    [key: string]: any;
}

const sign = (payload: Payload): string => {
    return jwt.sign(payload, process.env.SECRET_KEY as string);
}

const verify = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY as string);
    } catch (error) {
        return (error as Error).message;
    }
}

export { sign, verify };
