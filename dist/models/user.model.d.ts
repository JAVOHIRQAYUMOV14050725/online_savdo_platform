import { Model } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '@interfaces';
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    name: string;
    email: string;
    username: string;
    passwordHash: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { User };
