import { Model, DataTypes, Optional, DATE, } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


export interface LembreteCreationAttributes extends Optional<LembreteAttributes, 'id'> {};

interface LembreteAttributes {
  id: number;
  nome: string;
  descricao?: string;
  data_inicio: Date;
  data_fim: Date;
  discId: number;
}


export class Lembrete extends Model<LembreteAttributes, LembreteCreationAttributes> implements LembreteAttributes {
    id!: number;
    nome!: string;
    descricao?: string;
    data_inicio!: Date;
    data_fim!: Date;
    discId!: number;
}


Lembrete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  
      primaryKey: true,    
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    discId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "lembretes", 
    timestamps: false,
  }
);