import * as bcrypt from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../models/User";
import * as jwt from "jsonwebtoken";

//foi adicionada criptografia de senha no create e update

const userRepository = new UserRepository();
const saltRounds = 10;

export class UserService {

  private userRepository = new UserRepository();
  private jwtSecret: jwt.Secret;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = (process.env.JWT_SECRET || "defaultSecret") as jwt.Secret;
    }

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

   async authenticate(email: string, senha: string): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user){
            throw new Error('Email ou senha incorretos')
        }
        const passwordOK = await bcrypt.compare(senha,user.senha);
        if (!passwordOK){
            throw new Error("Email ou senha incorretos");
        }

        const payload = {id:user.id, email:user.email};

        const token = jwt.sign(payload,this.jwtSecret,{expiresIn: '1h'})
        return {user, token};

    }
}

