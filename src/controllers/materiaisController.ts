import { Request, Response } from "express";
import { materiaisService } from "../services/materiaisService";

const service = new materiaisService();

export const MateriaisController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const material = await service.createMateriais(req.body);
      res.status(201).json(material);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const material = await service.updateMateriais(Number(req.params.id), req.body);
      if (!material) {
        res.status(404).json({ message: "Material não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const materials = await service.getAllMateriais(Number(req.params.id));
      res.json(materials);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async listByUser(req: Request, res: Response): Promise<void> {
    try {
      const materials = await service.getMateriaisByUser(Number(req.params.id));
      res.json(materials);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const material = await service.getMateriaisById(Number(req.params.id));
      if (!material) {
        res.status(404).json({ message: "Material não encontrado" });
        return;
      }
      res.json(material);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await service.deleteMateriaisById(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Material não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};