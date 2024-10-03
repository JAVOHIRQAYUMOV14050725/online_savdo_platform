import { Model } from 'sequelize';
export declare class SupportRequest extends Model {
    id: number;
    userId: string;
    question: string;
    status: 'new' | 'responded' | 'closed';
    createdAt: Date;
}
export declare class SupportResponse extends Model {
    id: number;
    requestId: string;
    response: string;
    respondedAt: Date;
}
