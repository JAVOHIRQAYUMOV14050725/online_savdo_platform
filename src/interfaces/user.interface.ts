

import { Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  username:string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export { UserAttributes, UserCreationAttributes };
