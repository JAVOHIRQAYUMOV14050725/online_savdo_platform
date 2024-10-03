import { Request, Response } from 'express';
export declare const createSupportRequest: (req: Request, res: Response) => Promise<Response>;
export declare const getAllSupportRequests: (req: Request, res: Response) => Promise<Response>;
export declare const getSupportRequestById: (req: Request, res: Response) => Promise<Response>;
export declare const respondToSupportRequest: (req: Request, res: Response) => Promise<Response>;
export declare const closeSupportRequest: (req: Request, res: Response) => Promise<Response>;
export declare const deleteSupportRequest: (req: Request, res: Response) => Promise<Response>;
