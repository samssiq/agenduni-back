import { User } from "../models/user";


export class UserRepository {
  async createUser(data: {
    nome: string, 
    email: string, 
    senha: string}) {

    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id: number, data:  {
    nome?: string, 
    email?: string, 
    senha?: string}) {

    const [rowsUpdated] = await User.update(data, {
      where: {id}
    });

    if (rowsUpdated === 0) return null;

    return await User.findByPk(id);
}
  async findById(id: number){
    return await User.findByPk(id);
  }

  async deleteUser(id: number){
    const user = await User.findByPk(id)
    if (!user) return null;
    await user.destroy();
    return user;
  }
  } 



