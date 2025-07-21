import { Request, Response } from "express";
import { userService } from "../services/userService";

const service = new userService();

export const UserController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await service.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await service.updateUser(Number(req.params.id), req.body);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await service.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await service.findById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await service.deleteUser(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(deleted);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};