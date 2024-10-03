import { Model } from 'sequelize';
import { BlogAttributes, BlogCreationAttributes } from '@interfaces';
declare class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
    id: number;
    title: string;
    content: string;
    authorId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export { Blog };
