import {Disciplina} from '../models/disciplina';
import {User} from '../models/user';

export class DisciplinaRepository {
  
    async createDiscplina(data: {
      nome: string;
      sala: string;
      professor: string;
      horario: string;
      avaliacoes: string;
      faltas: number;
      notas: number;
      userId: number;
  }) { 

    const user = await User.findByPk(data.userId);
    if (!user) return null;

    const discplina = await Disciplina.create({
        nome: data.nome,
        sala: data.sala,
        professor: data.professor,
        horario: data.horario,
        avaliacoes: data.avaliacoes,
        faltas: data.faltas,
        notas: data.notas,
        userId: data.userId,
    });
  }

    async getAllDisciplinas(userId: number){
    const user = await User.findByPk(userId);
    if (!user) return null;

    return await Disciplina.findAll({
        where: {userId},
        include: [{ model: User, attributes: ['id', 'nome', 'email'] }]
    });
  }

    async updateDisciplina(id: number, data: {
      nome: string;
      sala: string;
      professor: string;
      horario: string;
      avaliacoes: string;
      faltas: number;
      notas: number;
      userId: number
    }) {
    
    const [rowsUpdated] = await Disciplina.update(data, {
        where: {id}
    });
    if (rowsUpdated === 0) return null;

    return await Disciplina.findByPk(id);}

    async getOneDisciplina(userId: number, id: number){
    const discplina = await Disciplina.findOne({
        where: {
            userId,
            id,
        },

    })
    if (!discplina) return null}

    async deleteDisciplina(id: number, userId: number){
    const disciplina = await Disciplina.findOne({
        where: {
            userId,
            id,
        },
    })
    if (!disciplina) return null
    
    await disciplina.destroy();
  }

    
}