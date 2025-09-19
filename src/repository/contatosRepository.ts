import { Contato } from '../models/contatos';
import { Disciplina } from "../models/disciplina";

export class ContatosRepository{

async createContatos(data: { 
    nome: string;
    email: string;
    telefone: string;
    discId: number;
    }) {

        const disciplina  = await Disciplina.findByPk(data.discId);
        if (!disciplina) return null

        const contato = await Contato.create({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            discId: data.discId,
        });
    }

    async getAllContatos(discId: number){
        const disciplina = await Disciplina.findByPk(discId);
        if (!disciplina) return null

        return await Contato.findAll({
            where: {discId},
            include: [{model: Disciplina, attributes: ['nome', 'professor']}]
        })
    }

    async updateContato(id: number, data: {
       nome: string;
       email: string;
       telefone: string;
       discId: number;
    }) {
        const [rowsUpdated] = await Contato.update(data, {
            where: {id}
        });
        if (rowsUpdated === 0) return null;
    
        return await Contato.findByPk(id);
    }

    async getOneContato(discId: number, id: number){
        const contato = await Contato.findOne({
            where: {
                discId,
                id,
            }
        })
        if (!contato) return null
    }

    async deleteContato(discId: number, id: number){
        const contato = await Contato.findOne({
            where: {
                discId,
                id,
            },
        })
        if (!contato) return null
        
        await contato.destroy();
      }
    
}
