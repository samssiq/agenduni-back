import { Materiais, MateriaisCreationAttributes } from "../models/materiais";
import { Disciplina } from "../models/disciplina";
import { User } from "../models/User";
import { Blob } from "buffer"

export class MateriaisRepository {

    async createMateriais(data: MateriaisCreationAttributes): Promise<Materiais | null> {

        const disciplina  = await Disciplina.findByPk(data.discId);
        if (!disciplina) return null

        const materiais = await Materiais.create({
            nome: data.nome,
            resumos: data.resumos,
            links: data.links,
            arquivos: data.arquivos,
            discId: data.discId,

        });

        return materiais;
    }

    async getAllMateriais(discId: number){
        const disciplina = await Disciplina.findByPk(discId);
        if (!disciplina) return null

        return await Materiais.findAll({
            where: {discId},
            include: [{model: Disciplina, attributes: ['nome', 'professor']}]
        })
    }

    async getMateriaisByUser(userId: number){
        return await Materiais.findAll({
            include: [{
                model: Disciplina,
                attributes: ['nome', 'professor'],
                where: { userId },
                include: [{
                    model: User,
                    attributes: ['nome', 'email']
                }]
            }]
        });
    }

    async updateMateriais(id: number, data: {
       nome?: string;
       resumos?: string;
       links?: string;
       arquivos?: Blob;
       discId?: number;
    }) {
        const updateData: any = {};
        
        if (data.nome !== undefined) updateData.nome = data.nome;
        if (data.resumos !== undefined) updateData.resumos = data.resumos;
        if (data.links !== undefined) updateData.links = data.links;
        if (data.arquivos !== undefined) updateData.arquivos = data.arquivos;
        if (data.discId !== undefined) updateData.discId = data.discId;
        
        const [rowsUpdated] = await Materiais.update(updateData, {
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

        return material
    }

    async getMateriaisById(id: number){
        const material = await Materiais.findByPk(id);
        if (!material) return null

        return material;
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

    async deleteMateriaisById(id: number){
        const material = await Materiais.findByPk(id);
        if (!material) return null
        
        await material.destroy();
        return material;
    }
}