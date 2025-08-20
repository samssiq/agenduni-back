import sequelize from "../src/config/database";

import {UserService}  from "../src/services/UserService"; 
import { UserRepository } from "../src/repository/UserRepository";

import { User } from "../src/models/User"

describe("Criando um usuário", () => {
    let userService :UserService
    beforeEach(async () => {
        userService = new UserService(new UserRepository());
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve criar um usuário com sucesso (atributos válidos)", async () => {
        const userData = {
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        };
        const createdUser = await userService.createUser(userData);
        expect(createdUser).toHaveProperty("id");
        expect(createdUser.nome).toBe(userData.nome);
        expect(createdUser.email).toBe(userData.email);
    });
})
