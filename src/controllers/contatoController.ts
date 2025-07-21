import { Request, Response } from "express";
import { contatosService } from "../services/contatoService";

const service = new contatosService();

export const ContatoController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const contato = await service.createContatos(req.body);
      res.status(201).json(contato);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const contato = await service.updateContatos(Number(req.params.id), req.body);
      if (!contato) {
        res.status(404).json({ message: "Contato não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const contato = await service.getAllContatos(Number(req.params.id));
      res.json(contato);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const contato = await service.getOneContato(Number(req.params.id), req.body);
      if (!contato) {
        res.status(404).json({ message: "Contato não encontrado" });
        return;
      }
      res.json(contato);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await service.deleteContato(Number(req.params.id), req.body);
      if (!deleted) {
        res.status(404).json({ message: "Contato não encontrado" });
        return;
      }
      res.json(deleted);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};