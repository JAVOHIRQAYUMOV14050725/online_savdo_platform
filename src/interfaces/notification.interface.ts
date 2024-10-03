
 interface NotificationAttributes {
    id: number;
    userId: number;
    type: 'SMS' | 'email' | 'push';
    message: string;
    sentAt: Date;
    isRead: boolean;
  }
  
   interface NotificationCreationAttributes extends Omit<NotificationAttributes, 'id'> {}
  
   export {NotificationCreationAttributes, NotificationAttributes}