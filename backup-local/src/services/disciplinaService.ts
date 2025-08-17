import { Disciplina } from "../models/disciplina";
import { DisciplinaRepository } from "../repository/disciplinaRepository";

export class disciplinaService {
    private repo = new DisciplinaRepository();

    async createDisciplina(data: Disciplina) {
        return await this.repo.createDiscplina(data);
    }

    async getAllDisciplinas(discId: number) {
        return await this.repo.getAllDisciplinas(discId);
    }

    async updateDisciplina(id: number, data: Disciplina) {
        return await this.repo.updateDisciplina(id, data);
    }

    async getOneDisciplina(discId: number, id: number) {
        return await this.repo.getOneDisciplina(discId, id);
    }

    async deleteDisciplina(discId: number, id: number) {
        return await this.repo.deleteDisciplina(discId, id);
    }
}