import sequelize from "../src/config/database";
import { disciplinaService } from "../src/services/disciplinaService";
import { Disciplina } from "../src/models/disciplina";
import { User } from "../src/models/User";

describe("Criar disciplina", () => {
    let service: disciplinaService;

    beforeEach(async () => {
        service = new disciplinaService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve criar uma disciplina com sucesso", async () => {
        const usuario = await User.create({
            nome: "Usuário Teste",
            email: "teste@teste.com",
            senha: "123456"
        });

        const disciplinaData = {
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: usuario.id
        };
        const createdDisciplina = await service.createDisciplina(disciplinaData as Disciplina);
        expect(createdDisciplina).toHaveProperty("id");
        expect(createdDisciplina!.nome).toBe(disciplinaData.nome);
        expect(createdDisciplina!.userId).toBe(usuario.id);
    });
});

describe("Retornar disciplinas", () => {
    let service: disciplinaService;

    beforeEach(async () => {
        service = new disciplinaService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar todas as disciplinas de um usuário", async () => {
        const usuario = await User.create({
            nome: "Usuário Teste",
            email: "teste@teste.com",
            senha: "123456"
        });

        const disciplinaData1 = {
            nome: "Disciplina 1",
            sala: "Sala 1",
            professor: "Prof 1",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: usuario.id
        };
        const disciplinaData2 = {
            nome: "Disciplina 2",
            sala: "Sala 2",
            professor: "Prof 2",
            horario: "10:00 - 12:00",
            avaliacoes: "Avaliação 2",
            faltas: 0,
            notas: 9,
            userId: usuario.id
        };
        await service.createDisciplina(disciplinaData1 as Disciplina);
        await service.createDisciplina(disciplinaData2 as Disciplina);

        const disciplinas = await service.getAllDisciplinas(usuario.id);
        expect(disciplinas!.length).toBe(2);
    });
});

describe("Atualizar disciplina", () => {
    let service: disciplinaService;

    beforeEach(async () => {
        service = new disciplinaService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve atualizar uma disciplina", async () => {
        const usuario = await User.create({
            nome: "Usuário Teste",
            email: "teste@teste.com",
            senha: "123456"
        });

        const disciplinaData = {
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: usuario.id
        };
        const createdDisciplina = await service.createDisciplina(disciplinaData as Disciplina);

        const updatedDisciplina = await service.updateDisciplina(createdDisciplina!.id, {
            nome: "Disciplina Atualizada",
            sala: "Sala 102",
            professor: "Prof Atualizado",
            horario: "10:00 - 12:00",
            avaliacoes: "Avaliação 2",
            faltas: 1,
            notas: 9,
            userId: usuario.id
        } as Disciplina);

        expect(updatedDisciplina).not.toBeNull();
        expect(updatedDisciplina!.nome).toBe("Disciplina Atualizada");
        expect(updatedDisciplina!.sala).toBe("Sala 102");
    });
});

describe("Retornar uma única disciplina", () => {
    let service: disciplinaService;

    beforeEach(async () => {
        service = new disciplinaService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar uma disciplina pelo id", async () => {
        const usuario = await User.create({
            nome: "Usuário Teste",
            email: "teste@teste.com",
            senha: "123456"
        });

        const disciplinaData = {
            nome: "Disciplina Única",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: usuario.id
        };
        const createdDisciplina = await service.createDisciplina(disciplinaData as Disciplina);

        const foundDisciplina = await service.getOneDisciplina(usuario.id, createdDisciplina!.id);
        expect(foundDisciplina).not.toBeNull();
        expect(foundDisciplina!.id).toBe(createdDisciplina!.id);
    });
});

describe("Deletar disciplina", () => {
    let service: disciplinaService;

    beforeEach(async () => {
        service = new disciplinaService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve deletar uma disciplina", async () => {
        const usuario = await User.create({
            nome: "Usuário Teste",
            email: "teste@teste.com",
            senha: "123456"
        });

        const disciplinaData = {
            nome: "Disciplina para deletar",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: usuario.id
        };
        const createdDisciplina = await service.createDisciplina(disciplinaData as Disciplina);

        const deleted = await service.deleteDisciplina(usuario.id, createdDisciplina!.id);
        expect(deleted).toBeUndefined();
    });
});