import sequelize from "../src/config/database";
import { lembretesService } from "../src/services/lembretesService";
import { Lembrete } from "../src/models/lembretes";
import { Disciplina } from "../src/models/disciplina";
describe("Criar lembrete", () => {
    let service: lembretesService;

    beforeEach(async () => {
        service = new lembretesService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve criar um lembrete com sucesso", async () => {
        const disciplina = await Disciplina.create({
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: 1
        });

        const lembreteData = {
            data_inicio: new Date("2025-08-22T08:00:00"),
            data_fim: new Date("2025-08-22T10:00:00"),
            discId: disciplina.id
        };
        const createdLembrete = await service.createLembretes(lembreteData!);
        expect(createdLembrete!).toHaveProperty("id");
        expect(createdLembrete!.data_inicio.toISOString()).toBe(lembreteData!.data_inicio.toISOString());
        expect(createdLembrete!.data_fim.toISOString()).toBe(lembreteData!.data_fim.toISOString());
        expect(createdLembrete!.discId).toBe(lembreteData!.discId);
    });
});

describe("Retornar lembretes", () => {
    let service: lembretesService;

    beforeEach(async () => {
        service = new lembretesService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar todos os lembretes de uma disciplina", async () => {
        const disciplina = await Disciplina.create({
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: 1
        });

        const lembreteData1 = {
            data_inicio: new Date("2025-08-22T08:00:00"),
            data_fim: new Date("2025-08-22T09:00:00"),
            discId: disciplina.id
        };
        await service.createLembretes(lembreteData1);
        const lembreteData2 = {
            data_inicio: new Date("2025-08-22T09:00:00"),
            data_fim: new Date("2025-08-22T10:00:00"),
            discId: disciplina.id
        };
        await service.createLembretes(lembreteData2);

        const lembretes = await service.getAllLembretes(disciplina.id);
        expect(lembretes!.length).toBe(2);
    });
});

describe("Atualizar lembrete", () => {
    let service: lembretesService;

    beforeEach(async () => {
        service = new lembretesService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve atualizar um lembrete", async () => {
        const disciplina = await Disciplina.create({
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: 1
        });

        const lembreteData = {
            data_inicio: new Date("2025-08-22T08:00:00"),
            data_fim: new Date("2025-08-22T09:00:00"),
            discId: disciplina.id
        };
        const createdLembrete = await service.createLembretes(lembreteData!);

        const updatedLembrete = await service.updateLembretes(createdLembrete!.id, {
            data_inicio: new Date("2025-08-22T09:00:00"),
            data_fim: new Date("2025-08-22T10:00:00"),
            discId: disciplina.id
        });

        expect(updatedLembrete!).not.toBeNull();
        expect(updatedLembrete!.data_inicio.toISOString()).toBe("2025-08-22T09:00:00.000Z");
        expect(updatedLembrete!.data_fim.toISOString()).toBe("2025-08-22T10:00:00.000Z");
    });
});

describe("Retornar um único lembrete", () => {
    let service: lembretesService;

    beforeEach(async () => {
        service = new lembretesService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar um único lembrete", async () => {
        const disciplina = await Disciplina.create({
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: 1
        });

        const lembreteData = {
            data_inicio: new Date("2025-08-22T08:00:00"),
            data_fim: new Date("2025-08-22T09:00:00"),
            discId: disciplina.id
        };
        const createdLembrete = await service.createLembretes(lembreteData);

        const foundLembrete = await service.getOneLembrete(disciplina.id, createdLembrete!.id);
        expect(foundLembrete!).not.toBeNull();
        expect(foundLembrete!.id).toBe(createdLembrete!.id);
    });
});

describe("Deletar lembrete", () => {
    let service: lembretesService;

    beforeEach(async () => {
        service = new lembretesService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve deletar um lembrete", async () => {
        const disciplina = await Disciplina.create({
            nome: "Disciplina Teste",
            sala: "Sala 101",
            professor: "Prof Teste",
            horario: "08:00 - 10:00",
            avaliacoes: "Avaliação 1",
            faltas: 0,
            notas: 10,
            userId: 1
        });

        const lembreteData = {
            data_inicio: new Date("2025-08-22T08:00:00"),
            data_fim: new Date("2025-08-22T09:00:00"),
            discId: disciplina.id
        };
        const createdLembrete = await service.createLembretes(lembreteData!);

        const deleted = await service.deleteLembrete(disciplina.id, createdLembrete!.id);
        expect(deleted!).toBeUndefined();
    });
});