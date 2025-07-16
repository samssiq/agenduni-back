import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';


// Defina os atributos do modelo

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}

interface UserAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
}


export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
}


// Inicialize o modelo com os campos no banco
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users", 
    timestamps: false,
  }
);

