import { User } from "../models/user";


export class UserRepository {
    // Criar um novo usuário
  async createUser(name: string, email: string, password: string) {
    // Use o método `create` para salvar no banco de dados
    return await User.create({
      name,
      email,
      password
    });
  }


  async getAllUsers() {
    return await User.findAll();
  }
}

