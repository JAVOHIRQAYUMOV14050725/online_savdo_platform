
import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config';
import { CategoryAttributes, CategoryCreationAttributes } from '@interfaces';

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
    sequelize:sequelizeConfig,
  tableName: 'categories',
  timestamps: true,
});

export { Category };
