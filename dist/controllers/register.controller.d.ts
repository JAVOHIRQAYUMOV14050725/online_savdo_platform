import { Request, Response } from 'express';
import { RegisterBody } from '@interfaces';
declare const register: (req: Request<{}, {}, RegisterBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export { register };
