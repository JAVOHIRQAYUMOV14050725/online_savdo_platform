import { Request, Response } from 'express';
export declare const createCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllCarts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCartById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
