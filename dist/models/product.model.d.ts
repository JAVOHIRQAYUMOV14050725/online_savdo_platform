import { Model } from 'sequelize';
import { ProductAttributes, ProductCreationAttributes } from '@interfaces';
declare class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Product };
