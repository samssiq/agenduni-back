import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";


import { DisciplinaController } from "./controllers/disciplinaController";
import { ContatoController } from "./controllers/contatoController";
import { LembretesController } from "./controllers/lembretesController";
import { MateriaisController } from "./controllers/materiaisController";
import { UserController } from "./controllers/userController";

dotenv.config();

const app = express();
app.use(express.json());


app.post("/user", async (req, res) => await UserController.create(req, res));
app.get("/user", async (req, res) => await UserController.list(req, res));
app.get("/user/:id", async (req, res) => await UserController.findById(req, res));
app.patch("/user/:id", async (req, res) => await UserController.update(req, res));
app.delete("/user/:id", async (req, res) => await UserController.delete(req, res));

app.post("/disciplina", async (req, res) => await DisciplinaController.create(req, res));
app.get("/disciplina/:id", async (req, res) => await DisciplinaController.findById(req, res));
app.get("/disciplina", async (req, res) => await DisciplinaController.list(req, res));
app.patch("/disciplina/:id", async (req, res) => await DisciplinaController.update(req, res));
app.delete("/disciplina/:id", async (req, res) => await DisciplinaController.delete(req, res));

app.post("/contatos", async (req, res) => await ContatoController.create(req, res));
app.get("/contatos", async (req, res) => await ContatoController.list(req, res));
app.get("/contatos/:id", async (req, res) => await ContatoController.findById(req, res));
app.patch("/contatos/:id", async (req, res) => await ContatoController.update(req, res));
app.delete("/contatos/:id", async (req, res) => await ContatoController.delete(req, res));

app.post("/lembretes", async (req, res) => await LembretesController.create(req, res));
app.get("/lembretes", async (req, res) => await LembretesController.list(req, res));
app.patch("/lembretes/:id", async (req, res) => await LembretesController.update(req, res));
app.delete("/lembretes/:id", async (req, res) => await LembretesController.delete(req, res));
app.get("/lembretes/:id", async (req, res) => await LembretesController.findById(req, res));

app.post("/materiais", async (req, res) => await MateriaisController.create(req, res));
app.get("/materiais", async (req, res) => await MateriaisController.list(req, res));
app.patch("/materiais/:id", async (req, res) => await MateriaisController.update(req, res));
app.delete("/materiais/:id", async (req, res) => await MateriaisController.delete(req, res));
app.get("/materiais/:id", async (req, res) => await MateriaisController.findById(req, res));


sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});


