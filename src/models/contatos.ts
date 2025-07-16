import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


// Defina os atributos do modelo

interface ContatoCreationAttributes extends Optional<ContatoAttributes, 'id'>{}

interface ContatoAttributes {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}


export class Contato extends Model<ContatoAttributes, ContatoCreationAttributes> implements ContatoAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public telefone!: string;
}


// Inicialize o modelo com os campos no banco
Contato.init(
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
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "contatos", 
    timestamps: false,
  }
);

Disciplina.hasMany(Contato);