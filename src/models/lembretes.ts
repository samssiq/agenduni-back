import { Model, DataTypes, Optional, DATE, } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


// Defina os atributos do modelo

export interface LembreteCreationAttributes extends Optional<LembreteAttributes, 'id'> {};

interface LembreteAttributes {
  id: number;
  data_inicio: Date;
  data_fim: Date;
  discId: number;
}


export class Lembrete extends Model<LembreteAttributes, LembreteCreationAttributes> implements LembreteAttributes {
    id!: number;
    data_inicio!: Date;
    data_fim!: Date;
    discId!: number;
}


// Inicialize o modelo com os campos no banco
Lembrete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  
      primaryKey: true,    
      allowNull: false,
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

//Lembrete.belongsTo(Disciplina, {foreignKey: 'discId'});