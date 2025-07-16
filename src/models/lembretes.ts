import { Model, DataTypes, Optional, } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


// Defina os atributos do modelo

interface LembreteCreationAttributes extends Optional <LembreteAttributes, 'data_fim'>{}

interface LembreteAttributes {
  //id: number;
  data_inicio: number;
  data_fim: number;
}


export class Lembrete extends Model<LembreteAttributes, LembreteCreationAttributes> implements LembreteAttributes {
    data_inicio!: number;
    data_fim!: number;
}


// Inicialize o modelo com os campos no banco
Lembrete.init(
  {
    data_inicio: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    data_fim: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
  },
  {
    sequelize,
    tableName: "lembretes", 
    timestamps: false,
  }
);

Lembrete.belongsTo(Disciplina);

//avisos precisa ser uma classe? ou pode virar um método?