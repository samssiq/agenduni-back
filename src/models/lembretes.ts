import { Model, DataTypes, Optional, DATE, } from 'sequelize';
import sequelize from '../config/database';
import { Disciplina } from './disciplina';


// Defina os atributos do modelo

type LembreteCreationAttributes = Optional<LembreteAttributes, 'id'>;

interface LembreteAttributes {
  id: number;
  data_inicio: number;
  data_fim: number;
  discId: number;
}


export class Lembrete extends Model<LembreteAttributes, LembreteCreationAttributes> implements LembreteAttributes {
    id!: number;
    data_inicio!: number;
    data_fim!: number;
    discId!: number;
}


// Inicialize o modelo com os campos no banco
Lembrete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    data_fim: {
        type: DataTypes.NUMBER,
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

Lembrete.belongsTo(Disciplina, {foreignKey: 'discId'});