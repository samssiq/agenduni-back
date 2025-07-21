import { User } from "../models/user";
import { UserRepository } from "../repository/userRepository";

export class userService {
    private repo = new UserRepository();

    async createUser(data: User) {
        return await this.repo.createUser(data);
    }

    async getAllUsers() {
        return await this.repo.getAllUsers();
    }

    async updateUser(id: number, data: User) {
        return await this.repo.updateUser(id, data);
    }

    async findById(id: number) {
        return await this.repo.findById(id);
    }

    async deleteUser(id: number) {
        return await this.repo.deleteUser(id);
    }
}