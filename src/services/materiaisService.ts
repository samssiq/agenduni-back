import { Materiais } from "../models/materiais";
import { MateriaisRepository } from "../repository/materiaisRepository";
import { MateriaisCreationAttributes } from "../models/materiais";

export class materiaisService {
    private repo = new MateriaisRepository();

    async createMateriais(data: MateriaisCreationAttributes) {
        return await this.repo.createMateriais(data);
    }

    async getAllMateriais(discId: number) {
        return await this.repo.getAllMateriais(discId);
    }

    async updateMateriais(id: number, data: Materiais) {
        return await this.repo.updateMateriais(id, data);
    }

    async getOneMaterial(discId: number, id: number) {
        return await this.repo.getOneMaterial(discId, id);
    }

    async deleteMaterial(discId: number, id: number) {
        return await this.repo.deleteMaterial(discId, id);
    }
}