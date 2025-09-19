import {Disciplina} from '../models/disciplina';
import {User} from '../models/User';

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

    const disciplina = await Disciplina.create({
        nome: data.nome,
        sala: data.sala,
        professor: data.professor,
        horario: data.horario,
        avaliacoes: data.avaliacoes,
        faltas: data.faltas,
        notas: data.notas,
        userId: data.userId,
    });

    return disciplina;
  }

    async getAllDisciplinas(userId: number){
    const user = await User.findByPk(userId);
    if (!user) return null;

    return await Disciplina.findAll({
        where: {userId},
        include: [{ model: User, attributes: ['id', 'nome', 'email'] }]
    });
  }

    async updateDisciplina(id: number, data: any) {
    
    const [rowsUpdated] = await Disciplina.update(data, {
        where: {id}
    });
    if (rowsUpdated === 0) return null;

    return await Disciplina.findByPk(id);
  }

    async getOneDisciplina(userId: number, id: number){
    const disciplina = await Disciplina.findOne({
        where: {
            userId,
            id,
        },

    })
    if (!disciplina) return null
    return disciplina
  }

    async getDisciplinaById(id: number){
    const disciplina = await Disciplina.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'nome', 'email'] }]
    });
    return disciplina;
  }

    async deleteDisciplina(id: number, userId: number){
    const disciplina = await Disciplina.findOne({
        where: {
            userId,
            id,
        },
    })
    if (!disciplina) return null
    
    await disciplina.destroy();
    return true;
  }

    async deleteDisciplinaById(id: number){
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) return null;
    
    await disciplina.destroy();
    return true;
  }

    
}