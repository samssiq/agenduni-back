import { Lembrete } from "../models/lembretes";
import { LembretesRepository } from "../repository/lembretesRepository";

export class lembretesService {
    private repo = new LembretesRepository();

    async createlembretes(data: Lembrete) {
        return await this.repo.createLembretes(data);
    }

    async getAllLembretes(discId: number) {
        return await this.repo.getAllLembretes(discId);
    }

    async updateLembretes(id: number, data: Lembrete) {
        return await this.repo.updateLembrete(id, data);
    }

    async getOneLembrete(discId: number, id: number) {
        return await this.repo.getOneLembrete(discId, id);
    }

    async deleteLembrete(discId: number, id: number) {
        return await this.repo.deleteLembrete(discId, id);
    }
}