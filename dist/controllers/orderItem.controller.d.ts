import { Request, Response } from 'express';
export declare const createOrderItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOrderItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOrderItemById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateOrderItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteOrderItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
