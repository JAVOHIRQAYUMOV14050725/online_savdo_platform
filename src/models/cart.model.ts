
import { Model, DataTypes } from 'sequelize';
import { sequelizeConfig } from '@config'; 
import { CartAttributes, CartCreationAttributes } from '@interfaces';


class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize:sequelizeConfig,
    tableName: 'carts',
    timestamps: true,
  }
);

export  {Cart};
