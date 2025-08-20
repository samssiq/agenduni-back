import { User } from "../models/User";
import sequelize from "../config/database";


export class UserRepository {
  private UserModel: typeof User;
  

  constructor(){
    this.UserModel = User;
  }

  // async createUser(UserData:any):Promise<User> {
    
  //   const existingUser = await this.UserModel.findOne({where:{email:UserData.email}});
  //   console.log(existingUser);
  //   if (existingUser){
  //     throw new Error('Email já está em uso.');
  //   }
  //   // Use o método `create` para salvar no banco de dados
  //   return await this.UserModel.create(UserData);
  // }
  async createUser(data: {
    nome: string, 
    email: string, 
    senha: string
  }) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await this.UserModel.findAll();
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
    const user = await this.UserModel.findByPk(id);
    return user
      ? await user!.update(data)
      : null;
  }

  async findById(id: number){
    return await this.UserModel.findByPk(id);
  }

  //apenas um return para melhor legibilidade
  async deleteUser(id: number) {
    let success = false;
    const user = await this.UserModel.findByPk(id);
    if (user) {
      await user!.destroy();
      success = true;
    }
    return success;
  }
  
}


