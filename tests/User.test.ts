import sequelize from "../src/config/database";

import UserService  from "../src/services/UserService"; 

import createUser from "../src/services/UserService";
import getAllUsers from "../src/services/UserService";
import updateUser from "../src/services/UserService";
import getUserById from "../src/services/UserService";
import deleteUser from "../src/services/UserService";

import { User } from "../src/models/User"
import { beforeEach } from "node:test";

describe("Criando um usuário", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterEach(()=>{
        sequelize.dropAllSchemas({})
    })

    it("deve criar um usuário com sucesso (atributos válidos)", async () => {
        const userData = await UserService.createUser({
            nome:  "Maria",
            senha:  "minhasenha123",
            email:  "emailteste@teste.com",
        });
        const createdUser = await UserService.createUser(userData);
        expect(createdUser).toHaveProperty("id");
        expect(createdUser.nome).toBe(userData.nome);
        expect(createdUser.email).toBe(userData.email);
    });
})
