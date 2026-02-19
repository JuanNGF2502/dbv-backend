"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const desbravadorController = __importStar(require("../controllers/desbravadorController"));
const classeController = __importStar(require("../controllers/classeController"));
const progressoController = __importStar(require("../controllers/progressoController"));
const router = (0, express_1.Router)();
/* USERS */
router.post("/users", userController.create);
router.get("/users", userController.list);
router.get("/users/:id", userController.getById);
/* DESBRAVADORES */
router.post("/desbravadores", desbravadorController.create);
router.get("/desbravadores", desbravadorController.list);
router.get("/desbravadores/:id", desbravadorController.getById);
/* CLASSES */
router.post("/classes", classeController.create);
router.get("/classes", classeController.list);
router.get("/classes/:id", classeController.getById);
router.post("/classes/:id/requisitos", classeController.addRequisito);
/* PROGRESSO */
router.post("/progressos", progressoController.startClasse);
router.get("/desbravadores/:id/progressos", progressoController.listByDesbravador);
router.patch("/requisitos-progresso/:id/concluir", progressoController.concluirRequisito);
router.get("/classe-progresso", progressoController.listAll);
exports.default = router;
