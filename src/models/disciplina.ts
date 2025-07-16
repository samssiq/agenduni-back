import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import {User} from './user';

// Defina os atributos do modelo

interface DisciplinaCreationAttributes extends Model <DisciplinaAttributes>{}

interface DisciplinaAttributes {
  name: string;
  classroom: string;
  professor: string;
  schedule: string;
  exams: string;
  absence: number;
  grades: number;
}


export class Disciplina extends Model<DisciplinaAttributes, DisciplinaCreationAttributes> implements DisciplinaAttributes {
  name!: string;
  classroom!: string;
  professor!: string;
  schedule!: string;
  exams!: string;
  absence!: number;
  grades!: number;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classroom: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true, #quando usar o unique?
    },
    professor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    exams: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    absence: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    grades: {
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
