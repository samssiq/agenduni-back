import { Request, Response } from "express";
import { disciplinaService } from "../services/disciplinaService";

const service = new disciplinaService();

export const DisciplinaController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const disciplina = await service.createDisciplina(req.body);
      res.status(201).json(disciplina);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const disciplina = await service.updateDisciplina(Number(req.params.id), req.body);
      if (!disciplina) {
        res.status(404).json({ message: "Disciplina não encontrada" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const Disciplina = await service.getAllDisciplinas(Number(req.params.id));
      res.json(Disciplina);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const disciplina = await service.getOneDisciplina(Number(req.params.id), req.body);
      if (!disciplina) {
        res.status(404).json({ message: "Disciplina não encontrada" });
        return;
      }
      res.json(disciplina);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await service.deleteDisciplina(Number(req.params.id), req.body);
      if (!deleted) {
        res.status(404).json({ message: "Disciplina não encontrada" });
        return;
      }
      res.json(deleted);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};