import { Request, Response } from 'express';
export declare const createOrder: (req: Request, res: Response) => Promise<Response>;
export declare const getAllOrders: (req: Request, res: Response) => Promise<Response>;
export declare const getOrderById: (req: Request, res: Response) => Promise<Response>;
export declare const updateOrder: (req: Request, res: Response) => Promise<Response>;
export declare const deleteOrder: (req: Request, res: Response) => Promise<Response>;
