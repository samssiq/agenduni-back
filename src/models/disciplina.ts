import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import {User} from './user';

// Defina os atributos do modelo

interface DisciplinaCreationAttributes extends Model <DisciplinaAttributes>{}

interface DisciplinaAttributes {
  nome: string;
  sala: string;
  professor: string;
  horario: string;
  avaliacoes: string;
  faltas: number;
  notas: number;
}


export class Disciplina extends Model<DisciplinaAttributes, DisciplinaCreationAttributes> implements DisciplinaAttributes {
  nome!: string;
  sala!: string;
  professor!: string;
  horario!: string;
  avaliacoes!: string;
  faltas!: number;
  notas!: number;
}


// Inicialize o modelo com os campos no banco
Disciplina.init(
  {
    /**id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      #Deixa como chave primária? O usuário precisa atribuir um id à disciplina?
    }**/
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sala: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true, #quando usar o unique?
    },
    professor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
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
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
  },
  {
    sequelize,
    tableName: "disciplinas", 
    timestamps: false,
  }
);

User.hasMany(Disciplina);
