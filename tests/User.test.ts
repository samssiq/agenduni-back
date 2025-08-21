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

    describe("Retornando todos os usuários", () =>{
        let userService :UserService
         beforeEach(async () => {
        userService = new UserService(new UserRepository());
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve retornar todos os usuários", async () =>{
          const userData = {
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        };
        const createdUser = await userService.createUser(userData);

        const userData1 = {
            nome:  "Guigui",
            senha:  "euamosara",
            email:  "guilherme123@teste.com",
        };
        const createdUser1 = await userService.createUser(userData1);

        const createdUsers = (await userService.getAllUsers()).length;
        expect(createdUsers).toEqual(2);
    });
})
    describe("Atualizando um usuário", () => {
         let userService :UserService
         beforeEach(async () => {
        userService = new UserService(new UserRepository());
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve atualizar os campos dos usuário", async() =>{
          const userData = {
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        };
        const createdUser = await userService.createUser(userData);
        const updatedUser = await userService.updateUser(createdUser.id, {
            nome: "Maria Silva",
            senha: "minhanovasenha123",
            email: "emailnovoteste@teste.com",
        });
        expect(updatedUser!.nome).toBe(updatedUser!.nome);
        expect(updatedUser!.senha).toBe(updatedUser!.senha);
        expect(updatedUser!.email).toBe(updatedUser!.email);
    });
})  
    describe("Retornando um único usuário", () => {
         let userService :UserService
         beforeEach(async () => {
        userService = new UserService(new UserRepository());
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve retornar o usuário pelo seu id", async () => {
        const userData = {
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        };
        const createdUser = await userService.createUser(userData);
        const foundUser = await userService.getUserById(createdUser.id);
        expect(foundUser!.id).toEqual(createdUser!.id)
    });
})  
    describe("Deletar um usuário", () =>{
         let userService :UserService
         beforeEach(async () => {
        userService = new UserService(new UserRepository());
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve excluir um usuário", async() =>{
        const userData = {
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        };
        const createdUser = await userService.createUser(userData);
        const deletedUser = await userService.deleteUser(createdUser.id)
        expect(deletedUser).toBe(true);
    });

})
