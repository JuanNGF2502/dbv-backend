import { Router } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";

import { AuthController } from "./modules/auth/auth.controller";
import { UserController } from "./modules/users/user.controller";
import { ClassController } from "./modules/classes/class.controller";
import { RequisitoController } from "./modules/requisitos/requisito.controller";
import { DesbravadorController } from "./modules/desbravador/desbravador.controller";
import { ProgressoController } from "./modules/progresso/progresso.controller";
import { DashboardController } from "./modules/dashboard/dashboard.controller";
const routes = Router();

const authController = new AuthController();
const userController = new UserController();
const classController = new ClassController();
const requisitoController = new RequisitoController();
const desbravadorController = new DesbravadorController();
const progressoController = new ProgressoController();
const dashboardController = new DashboardController();

// pública
routes.post("/login", authController.login);

// protegidas
routes.use(authMiddleware);
routes.get("/usuarios/me", userController.me);

// usuários
routes.post("/diretores", userController.createDiretor);
routes.post("/instrutores", userController.createInstrutor);

// classes
routes.post("/classes", classController.create);
routes.get("/classes", classController.listar);
routes.put("/classes/:id", classController.atualizar);
routes.delete("/classes/:id", classController.deletar);
routes.get('/classes/instrutores', classController.listarInstrutores); // lista instrutores do clube
routes.post('/classes/vincular-instrutor', classController.vincularInstrutor);
routes.delete('/classes/:classeId/instrutor', classController.desvincularInstrutor);

// requisitos
routes.post("/requisitos", requisitoController.create);
routes.get("/requisitos/:classeId", requisitoController.listarPorClasse);
routes.put("/requisitos/:id", requisitoController.update);    
routes.delete("/requisitos/:id", requisitoController.delete); 

// desbravadores
routes.post("/desbravadores", desbravadorController.create);
routes.get("/desbravadores", desbravadorController.listar);
routes.get("/desbravadores/:id", desbravadorController.detalhar);

// progresso
routes.post("/progresso/concluir", progressoController.concluir);
routes.get("/progresso/:desbravadorId", progressoController.listar);
routes.delete("/progresso", progressoController.remover);
routes.patch("/progresso/:id", authMiddleware, desbravadorController.atualizarProgresso);


// dashboard
routes.get("/dashboard/classe/:id", dashboardController.progressoClasse);
// routes.ts
routes.get("/dashboard", dashboardController.index);

export default routes;
