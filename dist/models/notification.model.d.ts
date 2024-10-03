import { Model } from 'sequelize';
import { NotificationAttributes, NotificationCreationAttributes } from '@interfaces';
declare class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    id: number;
    userId: number;
    type: 'SMS' | 'email' | 'push';
    message: string;
    sentAt: Date;
    isRead: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Notification };
