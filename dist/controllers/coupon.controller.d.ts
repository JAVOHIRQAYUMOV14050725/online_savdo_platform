import { Request, Response } from 'express';
export declare const createCoupon: (req: Request, res: Response) => Promise<void>;
export declare const getAllCoupons: (req: Request, res: Response) => Promise<void>;
export declare const getCouponById: (req: Request, res: Response) => Promise<void>;
export declare const updateCoupon: (req: Request, res: Response) => Promise<void>;
export declare const deleteCoupon: (req: Request, res: Response) => Promise<void>;
