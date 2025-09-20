import { Request, Response } from "express";
import { lembretesService } from "../services/lembretesService";

const service = new lembretesService();

export const LembretesController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const lembrete = await service.createLembretes(req.body);
      res.status(201).json(lembrete);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const lembrete = await service.updateLembretes(Number(req.params.id), req.body);
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