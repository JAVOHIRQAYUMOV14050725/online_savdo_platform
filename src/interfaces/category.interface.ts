

import { Optional } from 'sequelize';

interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export { CategoryAttributes, CategoryCreationAttributes };
