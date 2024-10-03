import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config'; 
import { BlogAttributes, BlogCreationAttributes } from '@interfaces';

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public authorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: sequelizeConfig, // `sequelizeConfig`ni `sequelize` sifatida uzatish
  tableName: 'blogs',
  timestamps: true,
});

export { Blog };
