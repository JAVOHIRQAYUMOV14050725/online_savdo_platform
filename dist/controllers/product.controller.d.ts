import { Request, Response } from 'express';
export declare const createProduct: (req: Request, res: Response) => Promise<Response>;
export declare const getProducts: (req: Request, res: Response) => Promise<Response>;
export declare const getProductById: (req: Request, res: Response) => Promise<Response>;
export declare const updateProduct: (req: Request, res: Response) => Promise<Response>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<Response>;
