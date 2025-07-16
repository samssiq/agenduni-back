import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import {Disciplina} from './disciplina';

// Defina os atributos do modelo

interface MateriaisCreationAttributes extends Model <MateriaisAttributes>{}

interface MateriaisAttributes {
   resumos: string;
   links: string;
   //arquivos (imagens, pdfs, docs): ??? como referenciá-los?
}


export class Materiais extends Model<MateriaisAttributes, MateriaisCreationAttributes> implements MateriaisAttributes {
    resumos!: string;
    links!: string;
    //arquivos (imagens, pdfs, docs): ??? como referenciá-los?
}


// Inicialize o modelo com os campos no banco
Materiais.init(
  {
    /**id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      #Deixa como chave primária? O usuário precisa atribuir um id a um material?
    }**/
    resumos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    links: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //arquivos (imagens, pdfs, docs): ??? como referenciá-los?
    //quais os possiveis datatypes?
  },
  {
    sequelize,
    tableName: "materiais", 
    timestamps: false,
  }
);
 //Uma disciplina pode ter vários materiais, mas não várias abas de materiais.