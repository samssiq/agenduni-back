import { Contato } from "../models/contatos";
import { ContatosRepository } from "../repository/contatosRepository";

export class contatosService {
    private repo = new ContatosRepository();

    async createContatos(data: Contato) {
        return await this.repo.createContatos(data);
    }

    async getAllContatos(discId: number) {
        return await this.repo.getAllContatos(discId);
    }

    async updateContatos(id: number, data: Contato) {
        return await this.repo.updateContato(id, data);
    }

    async getOneContato(discId: number, id: number) {
        return await this.repo.getOneContato(discId, id);
    }

    async deleteContato(discId: number, id: number) {
        return await this.repo.deleteContato(discId, id);
    }
}