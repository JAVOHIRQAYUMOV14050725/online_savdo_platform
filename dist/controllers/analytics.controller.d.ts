import { Request, Response } from 'express';
export declare const getUserAnalytics: (req: Request, res: Response) => Promise<Response>;
export declare const getOrderAnalytics: (req: Request, res: Response) => Promise<Response>;
export declare const getProductSales: (req: Request, res: Response) => Promise<Response>;
export declare const getSiteVisits: (req: Request, res: Response) => Promise<Response>;
