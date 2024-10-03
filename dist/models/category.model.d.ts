import { Model } from 'sequelize';
import { CategoryAttributes, CategoryCreationAttributes } from '@interfaces';
declare class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Category };
