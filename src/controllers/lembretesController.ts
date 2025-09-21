import { Request, Response } from "express";
import { lembretesService } from "../services/lembretesService";

const service = new lembretesService();

export const LembretesController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validações básicas
      if (!req.body.nome) {
        res.status(400).json({ error: "Nome é obrigatório" });
        return;
      }
      
      if (!req.body.discId || req.body.discId === 0) {
        res.status(400).json({ error: "Disciplina deve ser selecionada" });
        return;
      }
      
      if (!req.body.data_inicio) {
        res.status(400).json({ error: "Data é obrigatória" });
        return;
      }

      // O frontend agora envia os dados já no formato correto do backend
      const lembreteData = {
        nome: req.body.nome,                      // frontend agora envia 'nome'
        descricao: req.body.descricao,            // frontend envia 'descricao'
        data_inicio: new Date(req.body.data_inicio), // frontend agora envia 'data_inicio'
        data_fim: new Date(req.body.data_fim || req.body.data_inicio), // frontend envia 'data_fim' ou usa data_inicio
        discId: req.body.discId                   // frontend agora envia 'discId'
      };
      
      const lembrete = await service.createLembretes(lembreteData);
      if (!lembrete) {
        res.status(400).json({ error: "Disciplina não encontrada" });
        return;
      }
      res.status(201).json(lembrete);
    } catch (err: any) {
      console.error("Erro ao criar lembrete:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      // O frontend agora envia os dados no formato correto do backend
      const updateData = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        data_inicio: req.body.data_inicio ? new Date(req.body.data_inicio) : undefined,
        data_fim: req.body.data_fim ? new Date(req.body.data_fim) : undefined,
        discId: req.body.discId
      };
      
      const lembrete = await service.updateLembretes(Number(req.params.id), updateData);
      if (!lembrete) {
        res.status(404).json({ message: "Lembrete não encontrado" });
        return;
      }
      res.status(200).json({ message: "Lembrete atualizado com sucesso" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const lembretes = await service.getAllLembretes(Number(req.params.id));
      res.json(lembretes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async listByUser(req: Request, res: Response): Promise<void> {
    try {
      const lembretes = await service.getLembretesByUser(Number(req.params.id));
      res.json(lembretes);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const lembrete = await service.getLembreteById(Number(req.params.id));
      if (!lembrete) {
        res.status(404).json({ message: "Lembrete não encontrado" });
        return;
      }
      res.json(lembrete);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await service.deleteLembreteById(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Lembrete não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};