import { Lembrete } from "../models/lembretes";
import { Disciplina } from "../models/disciplina";

export class LembretesRepository {

    async createLembretes(data: { 
       nome: string;
       data_inicio: Date;
       data_fim: Date;
       discId: number;
    }) {

        const disciplina  = await Disciplina.findByPk(data.discId);
        if (!disciplina) return null

        const lembrete = await Lembrete.create({
            nome: data.nome,
            data_inicio: new Date(data.data_inicio),
            data_fim: new Date(data.data_fim),
            discId: data.discId,

        });
        return lembrete;
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
       nome?: string;
       data_inicio?: Date;
       data_fim?: Date;
       discId?: number;
    }) {
        const updateData: any = {};
        
        if (data.nome) updateData.nome = data.nome;
        if (data.data_inicio) updateData.data_inicio = new Date(data.data_inicio);
        if (data.data_fim) updateData.data_fim = new Date(data.data_fim);
        if (data.discId) updateData.discId = data.discId;

        const [rowsUpdated] = await Lembrete.update(updateData, {
            where: {id}
        });
        if (rowsUpdated === 0) return null;
    
        return await Lembrete.findByPk(id);
    }

    async getOneLembrete(discId: number, id: number): Promise<Lembrete | null> {
        const lembrete = await Lembrete.findOne({
            where: {
                discId,
                id,
            }
        })
        if (!lembrete) return null
        return lembrete;
    }

    async getLembreteById(id: number): Promise<Lembrete | null> {
        return await Lembrete.findByPk(id, {
            include: [{ model: Disciplina, attributes: ['nome', 'professor'] }]
        });
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
        return true;
    }

    async deleteLembreteById(id: number): Promise<boolean>{
        const lembrete = await Lembrete.findByPk(id);
        if (!lembrete) return false;
        
        await lembrete.destroy();
        return true;
    }
}