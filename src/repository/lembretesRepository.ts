import { Lembrete } from "../models/lembretes";
import { Disciplina } from "../models/disciplina";

export class LembretesRepository {

    async createLembretes(data: { 
       data_inicio: number;
       data_fim: number;
       discId: number;
    }) {

        const disciplina  = await Disciplina.findByPk(data.discId);
        if (!disciplina) return null

        const materais = await Lembrete.create({
            data_inicio: data.data_inicio,
            data_fim: data.data_fim,
            discId: data.discId,

        });
    }

    async getAllLembretes(discId: number){
        const disciplina = await Disciplina.findByPk(discId);
        if (!disciplina) return null

        return await Lembrete.findAll({
            where: {discId},
            include: [{model: Disciplina, attributes: ['nome', 'professor']}]
        })
    }

    async updateLembrete(id: number, data: {
       data_inicio: number;
       data_fim: number;
       discId: number;
    }) {
        const [rowsUpdated] = await Lembrete.update(data, {
            where: {id}
        });
        if (rowsUpdated === 0) return null;
    
        return await Lembrete.findByPk(id);
    }

    async getOneLembrete(discId: number, id: number){
        const lembrete = await Lembrete.findOne({
            where: {
                discId,
                id,
            }
        })
        if (!lembrete) return null
    }

    async deleteLembrete(discId: number, id: number){
        const lembrete = await Lembrete.findOne({
            where: {
                discId,
                id,
            },
        })
        if (!lembrete) return null
        
        await lembrete.destroy();
      }
}