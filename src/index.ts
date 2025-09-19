import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { setupSwagger } from "./config/swagger";
import { User } from "./models/User";
import { Disciplina } from "./models/disciplina";
import { Materiais } from "./models/materiais";
import { Contato } from "./models/contatos";
import { Lembrete } from "./models/lembretes";

import userRoutes from "./routes/UserRoutes";
import contatoRoute from "./routes/contatoRoute";
import disciplinaRoutes from "./routes/disciplinaRoutes";
import { DisciplinaController } from "./controllers/disciplinaController";
import { ContatoController } from "./controllers/contatoController";
import { LembretesController } from "./controllers/lembretesController";
import { MateriaisController } from "./controllers/materiaisController";
import {UserController} from "./controllers/UserController"; 

dotenv.config();

// Associações dos modelos
Materiais.belongsTo(Disciplina, { foreignKey: 'discId' });
Disciplina.hasMany(Materiais, { foreignKey: 'discId' });

Disciplina.hasMany(Contato, { foreignKey: 'discId' });
Contato.belongsTo(Disciplina, { foreignKey: 'discId' });

Disciplina.hasMany(Lembrete, { foreignKey: 'discId' });
Lembrete.belongsTo(Disciplina, { foreignKey: 'discId' });

Disciplina.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Disciplina, { foreignKey: 'userId' });

const app = express();
app.use(express.json());
setupSwagger(app);

app.use("/users",userRoutes);

app.use("/contatos",contatoRoute);

app.use("/disciplinas", disciplinaRoutes);


sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar ao banco de dados:", error);
});