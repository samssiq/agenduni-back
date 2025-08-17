import * as bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";

//foi adicionada criptografia de senha no create e update

const userRepository = new UserRepository();
const saltRounds = 10;

class UserService {

  async createUser(data: {
    nome: string,
    email: string,
    senha: string,
  }) {
    data.senha = await bcrypt.hash(data.senha, saltRounds);

    return await userRepository.createUser(data);
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async updateUser(id: number, data: Partial<{
    nome: string,
    email: string,
    senha: string,
  }>) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }

    return await userRepository.updateUser(id, data);
  }

  async getUserById(id: number) {
      return await userRepository.findById(id);
  }

  async deleteUser(id: number) {
      return await userRepository.deleteUser(id);
  }
}

export default new UserService();