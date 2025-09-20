import { Lembrete } from "../models/lembretes";
import { LembretesRepository } from "../repository/lembretesRepository";
import { LembreteCreationAttributes } from "../models/lembretes";

export class lembretesService {
    private repo = new LembretesRepository();

    async createLembretes(data: LembreteCreationAttributes): Promise<Lembrete | null> {
        const result = await this.repo.createLembretes(data);
        return result === undefined ? null : result;
    }

    async getAllLembretes(discId: number) {
        return await this.repo.getAllLembretes(discId);
    }

    async updateLembretes(id: number, data: any): Promise<Lembrete | null> {
        return await this.repo.updateLembrete(id, data);
    }

    async getLembreteById(id: number): Promise<Lembrete | null> {
        return await this.repo.getLembreteById(id);
    }

    async getOneLembrete(discId: number, id: number): Promise<Lembrete | null> {
        const result = await this.repo.getOneLembrete(discId, id);
        return result === undefined ? null : result;
    }

    async deleteLembreteById(id: number): Promise<boolean> {
        return await this.repo.deleteLembreteById(id);
    }

    async deleteLembrete(discId: number, id: number): Promise<void> {
        await this.repo.deleteLembrete(discId, id);
    }
    }