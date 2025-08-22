import { Model, DataTypes, Optional, IntegerDataType } from 'sequelize';
import { Blob } from 'buffer';
import sequelize from '../config/database';
import {Disciplina} from './disciplina';

// Defina os atributos do modelo
export interface MateriaisCreationAttributes extends Optional<MateriaisAttributes, 'id'>{};

 interface MateriaisAttributes {
   id: number
   resumos: string;
   links: string;
   arquivos: Blob;
   discId: number;
}


export class Materiais extends Model<MateriaisAttributes, MateriaisCreationAttributes> implements MateriaisAttributes {
    id!: number;
    resumos!: string;
    links!: string;
    arquivos!: Blob;
    discId!: number;
}


// Inicialize o modelo com os campos no banco
Materiais.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

// Materiais.belongsTo(Disciplina, {foreignKey: 'discId'});