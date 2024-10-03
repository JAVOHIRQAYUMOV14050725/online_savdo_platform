import { Request, Response } from 'express';
export declare const createShipping: (req: Request, res: Response) => Promise<Response>;
export declare const getAllShippings: (req: Request, res: Response) => Promise<Response>;
export declare const getShippingById: (req: Request, res: Response) => Promise<Response>;
export declare const updateShipping: (req: Request, res: Response) => Promise<Response>;
export declare const deleteShipping: (req: Request, res: Response) => Promise<Response>;
