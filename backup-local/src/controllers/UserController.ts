import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {

  //o retorno de cada método deve ser Promise<Response>
  
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.updateUser(parseInt(req.params.id), req.body);
      return !user
        ? res.status(404).json({ error: "Usuário não encontrado" })
        : res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(parseInt(req.params.id));
      return !user 
        ? res.status(404).json({ error: "Usuário não encontrado" }) 
        : res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const success = await UserService.deleteUser(parseInt(req.params.id));
      return !success
        ? res.status(404).json({ error: "Usuário não encontrado" })
        : res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
  }
}

export default new UserController();