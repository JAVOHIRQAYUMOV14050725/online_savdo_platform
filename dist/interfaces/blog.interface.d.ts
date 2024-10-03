import { Optional } from 'sequelize';
interface BlogAttributes {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface BlogCreationAttributes extends Optional<BlogAttributes, 'id'> {
}
export { BlogAttributes, BlogCreationAttributes };
