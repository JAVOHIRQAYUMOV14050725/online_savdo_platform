import { Request, Response } from "express";
import { LoginBody } from "@interfaces";
declare const login: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { login };
