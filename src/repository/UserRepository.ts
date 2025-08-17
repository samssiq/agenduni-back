import { User } from "../models/User";

export class UserRepository {

  async createUser(data: {
    nome: string, 
    email: string, 
    senha: string
  }) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  //jeito correto de fazer update para um único usuário
  //afinal estamos usando id
  async updateUser(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
    }>
  ) {
    const user = await User.findByPk(id);
    return user
      ? await user!.update(data)
      : null;
  }

  async findById(id: number){
    return await User.findByPk(id);
  }

  //apenas um return para melhor legibilidade
  async deleteUser(id: number) {
    let success = false;
    const user = await User.findByPk(id);
    if (user) {
      await user!.destroy();
      success = true;
    }
    return success;
  }
  
}


