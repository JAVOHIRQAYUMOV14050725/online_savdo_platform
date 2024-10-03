import { Request, Response } from 'express';
export declare const createWishlist: (req: Request, res: Response) => Promise<Response>;
export declare const getAllWishlists: (req: Request, res: Response) => Promise<Response>;
export declare const getWishlistById: (req: Request, res: Response) => Promise<Response>;
export declare const updateWishlist: (req: Request, res: Response) => Promise<Response>;
export declare const deleteWishlist: (req: Request, res: Response) => Promise<Response>;
