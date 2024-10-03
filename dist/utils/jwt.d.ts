import jwt from "jsonwebtoken";
interface Payload {
    [key: string]: any;
}
declare const sign: (payload: Payload) => string;
declare const verify: (token: string) => string | jwt.JwtPayload;
export { sign, verify };
