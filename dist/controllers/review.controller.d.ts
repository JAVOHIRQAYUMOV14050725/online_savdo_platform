import { Request, Response } from 'express';
export declare const createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllReviews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getReviewsByProductId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getReviewById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
