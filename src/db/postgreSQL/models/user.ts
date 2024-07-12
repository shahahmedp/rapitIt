'use strict';
import { Model, UUIDV4, Sequelize, DataTypes } from 'sequelize';

interface UserAttributes {
  id: string;
  userName: string;
  email: string;
  password: string;
}

module.exports = (sequelize: Sequelize, DataType: typeof DataTypes) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public userName!: string;
    public email!: string;
    public password!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models: any) {
    //   // define association here
    // }
  }

  User.init(
    {
      id: {
        type: DataType.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userName: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
    },
  );

  return User;
};
