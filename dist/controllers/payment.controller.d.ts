import { Request, Response } from 'express';
export declare const createPayment: (req: Request, res: Response) => Promise<Response>;
export declare const getAllPayments: (req: Request, res: Response) => Promise<Response>;
export declare const getPaymentById: (req: Request, res: Response) => Promise<Response>;
export declare const updatePayment: (req: Request, res: Response) => Promise<Response>;
export declare const deletePayment: (req: Request, res: Response) => Promise<Response>;
