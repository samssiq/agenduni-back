import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


// Defina os atributos do modelo

type ContatoCreationAttributes = Optional<ContatoAttributes, 'id'>;

interface ContatoAttributes {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  discId: number;
}


export class Contato extends Model<ContatoAttributes, ContatoCreationAttributes> implements ContatoAttributes {
   id!: number;
   nome!: string;
   email!: string;
   telefone!: string;
   discId!: number;

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
    discId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "contatos", 
    timestamps: false,
  }
);

Contato.belongsTo(Disciplina, {foreignKey: 'discId'})