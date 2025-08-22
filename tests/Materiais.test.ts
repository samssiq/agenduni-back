import sequelize from "../src/config/database";
import { materiaisService } from "../src/services/materiaisService";
import { MateriaisRepository } from "../src/repository/materiaisRepository";
import { Materiais } from "../src/models/materiais";
import { Blob } from "buffer";
import { Disciplina } from "../src/models/disciplina";

describe("Criar material", () => {
    let MateriaisService :materiaisService

    beforeEach(async () => {
        MateriaisService = new materiaisService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve criar um material com sucesso", async () => {
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

        const materialData = {
            resumos: "Resumo do material",
            links: "http://link-do-material",
            arquivos: new Blob(["Conteúdo do arquivo"], { type: "text/plain" }),
            discId: disciplina.id
        } 
        const createdMaterial = await MateriaisService.createMateriais(materialData);
        expect(createdMaterial).toHaveProperty("id");
        expect(createdMaterial!.resumos).toBe(materialData!.resumos);
        expect(createdMaterial!.links).toBe(materialData!.links);
        expect(createdMaterial!.arquivos.toString()).toBe(materialData!.arquivos.toString());
        expect(createdMaterial!.discId).toBe(materialData!.discId);
    });
})

    describe("Retornar material/resumo", () => {
    let service: materiaisService;

    beforeEach(async () => {
        service = new materiaisService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar todos os materiais de uma disciplina", async () => {
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
        const materialData1 = { 
            resumos: "Resumo do material",
            links: "http://link-do-material",
            arquivos: new Blob(["Conteúdo do arquivo"], { type: "text/plain" }),
            discId: disciplina.id
        };
        const materialData2 = { 
            resumos: "Resumo do material 2",
            links: "http://link-do-material-2",
            arquivos: new Blob(["Conteúdo do arquivo 2"], { type: "text/plain" }),
            discId: disciplina.id
        };
        await service.createMateriais(materialData1);
        await service.createMateriais(materialData2);

        const materiais = await service.getAllMateriais(disciplina.id);
        expect(materiais!.length).toBe(2);
    });
});

    describe("Atualizar material", () => {
    let service: materiaisService;

    beforeEach(async () => {
        service = new materiaisService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve atualizar um material", async () => {
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
        const materialData = { 
            resumos: "Resumo do material",
            links: "http://link-do-material",
            arquivos: new Blob(["Conteúdo do arquivo"], { type: "text/plain" }),
            discId: disciplina.id
        };
        const createdMaterial = await service.createMateriais(materialData);

        const updatedMaterial = await service.updateMateriais(createdMaterial!.id, {
            resumos: "Resumo do material atualizado",
            links: "http://link-do-material-atualizado",
            discId: disciplina.id
        } as Materiais);

        expect(updatedMaterial).not.toBeNull();
        expect(updatedMaterial!.resumos).toBe("Resumo do material atualizado");
        expect(updatedMaterial!.links).toBe("http://link-do-material-atualizado");
    });
});

    describe("Retornar um único material", () => {
    let service: materiaisService;

    beforeEach(async () => {
        service = new materiaisService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });

    it("deve retornar um único material", async () => {
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
        const materialData = { 
            resumos: "Resumo do material único",
            links: "http://link-do-material-unico",
            arquivos: new Blob(["Conteúdo do arquivo único"], { type: "text/plain" }),
            discId: disciplina.id
        };
        const createdMaterial = await service.createMateriais(materialData);

        const foundMaterial = await service.getOneMaterial(disciplina.id, createdMaterial!.id);
        expect(foundMaterial).not.toBeNull();
        expect(foundMaterial!.id).toBe(createdMaterial!.id);
    });
});

    describe("Deletar material", () => {
    let service: materiaisService;

    beforeEach(async () => {
        service = new materiaisService();
        await sequelize.sync({ force: true });
    });

    afterEach(() => {
        sequelize.dropAllSchemas({});
    });
    it("deve deletar um material", async () => {
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
        const materialData = { 
            resumos: "Resumo do material para deletar",
            links: "http://link-do-material-para-deletar",
            arquivos: new Blob(["Conteúdo do arquivo para deletar"], { type: "text/plain" }),
            discId: disciplina.id
        };
        const createdMaterial = await service.createMateriais(materialData);

        const deleted = await service.deleteMaterial(disciplina.id, createdMaterial!.id);
    });
});