import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.updateUser(parseInt(req.params.id), req.body);
      return !user
        ? res.status(404).json({ error: "Usuário não encontrado" })
        : res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id));
      return !user 
        ? res.status(404).json({ error: "Usuário não encontrado" }) 
        : res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const success = await this.userService.deleteUser(parseInt(req.params.id));
      return !success
        ? res.status(404).json({ error: "Usuário não encontrado" })
        : res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
  }

  async login(req:Request, res:Response):Promise<Response>{
        try{
            const{email,senha} = req.body;
            const authResult = await this.userService.authenticate(email,senha);
            return res.json(authResult);
        } catch (error:any){
            return res.status(400).json({message:error.message});
        }
    }
}