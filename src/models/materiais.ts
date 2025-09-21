import { Model, DataTypes, Optional, IntegerDataType } from 'sequelize';
import { Blob } from 'buffer';
import sequelize from '../config/database';
import {Disciplina} from './disciplina';

export interface MateriaisCreationAttributes extends Optional<MateriaisAttributes, 'id'>{};

 interface MateriaisAttributes {
   id: number
   nome: string;
   resumos: string;
   links: string;
   arquivos: Blob;
   discId: number;
}


export class Materiais extends Model<MateriaisAttributes, MateriaisCreationAttributes> implements MateriaisAttributes {
    id!: number;
    nome!: string;
    resumos!: string;
    links!: string;
    arquivos!: Blob;
    discId!: number;
}

Materiais.init(
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
    resumos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    links: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arquivos: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    discId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "materiais", 
    timestamps: false,
  }
);