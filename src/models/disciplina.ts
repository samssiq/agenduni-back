import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Materiais } from './materiais';
import { Contato } from './contatos'
import { Lembrete } from './lembretes';

type DisciplinaCreationAttributes = Optional<DisciplinaAttributes, 'id'>;

interface DisciplinaAttributes {
  id: number;
  nome: string;
  sala: string;
  professor: string;
  horario: string;
  semestre: string;
  avaliacoes: string;
  faltas: number;
  notas: number;
  userId: number;
}


export class Disciplina extends Model<DisciplinaAttributes, DisciplinaCreationAttributes> implements DisciplinaAttributes {
  id!: number;
  nome!: string;
  sala!: string;
  professor!: string;
  horario!: string;
  semestre!: string;
  avaliacoes!: string;
  faltas!: number;
  notas!: number;
  userId!: number;
}


Disciplina.init(
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
    sala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    semestre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avaliacoes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    faltas: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    notas: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
    
  },
  {
    sequelize,
    tableName: "disciplinas", 
    timestamps: false,
  }
);