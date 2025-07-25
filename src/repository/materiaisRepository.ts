import { Materiais } from "../models/materiais";
import { Disciplina } from "../models/disciplina";
import { Blob } from "buffer";

export class MateriaisRepository {

    async createMateriais(data: { 
       resumos: string;
       links: string;
       arquivos: Blob;
       discId: number;
    }) {

        const disciplina  = await Disciplina.findByPk(data.discId);
        if (!disciplina) return null

        const materais = await Materiais.create({
            resumos: data.resumos,
            links: data.links,
            arquivos: data.arquivos,
            discId: data.discId,

        });
    }

    async getAllMateriais(discId: number){
        const disciplina = await Disciplina.findByPk(discId);
        if (!disciplina) return null

        return await Materiais.findAll({
            where: {discId},
            include: [{model: Disciplina, attributes: ['nome', 'professor']}]
        })
    }

    async updateMateriais(id: number, data: {
       resumos: string;
       links: string;
       arquivos: Blob;
       discId: number;
    }) {
        const [rowsUpdated] = await Materiais.update(data, {
            where: {id}
        });
        if (rowsUpdated === 0) return null;
    
        return await Materiais.findByPk(id);
    }

    async getOneMaterial(discId: number, id: number){
        const material = await Materiais.findOne({
            where: {
                discId,
                id,
            }
        })
        if (!material) return null
    }

    async deleteMaterial(discId: number, id: number){
        const material = await Materiais.findOne({
            where: {
                discId,
                id,
            },
        })
        if (!material) return null
        
        await material.destroy();
      }
}