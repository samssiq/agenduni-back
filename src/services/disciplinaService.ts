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

    async getAllDisciplinasWithoutFilter() {
        return await this.repo.getAllDisciplinasWithoutFilter();
    }

    async updateDisciplina(id: number, data: any) {
        // Converter notas para número se for string
        if (data.notas && typeof data.notas === 'string') {
            data.notas = parseFloat(data.notas);
        }
        if (data.faltas && typeof data.faltas === 'string') {
            data.faltas = parseInt(data.faltas);
        }
        
        return await this.repo.updateDisciplina(id, data);
    }

    async getOneDisciplina(discId: number, id: number) {
        return await this.repo.getOneDisciplina(discId, id);
    }

    async getDisciplinaById(id: number) {
        return await this.repo.getDisciplinaById(id);
    }

    async deleteDisciplina(discId: number, id: number) {
        return await this.repo.deleteDisciplina(discId, id);
    }

    async deleteDisciplinaById(id: number) {
        return await this.repo.deleteDisciplinaById(id);
    }
}