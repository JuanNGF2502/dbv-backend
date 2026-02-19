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
exports.startClasse = startClasse;
exports.listByDesbravador = listByDesbravador;
exports.concluirRequisito = concluirRequisito;
exports.listAll = listAll;
const client_1 = require("@prisma/client");
const service = __importStar(require("../services/progressoService"));
const prisma = new client_1.PrismaClient();
async function startClasse(req, res) {
    const { desbravadorId, classeId, obrigatoria } = req.body;
    const progresso = await service.iniciarClasse(desbravadorId, classeId, obrigatoria);
    res.json(progresso);
}
async function listByDesbravador(req, res) {
    const desbravadorId = Number(req.params.id);
    const progressos = await prisma.classeProgresso.findMany({
        where: { desbravadorId },
        include: {
            classe: true,
            requisitosProgresso: {
                include: { requisito: true },
            },
        },
    });
    res.json(progressos);
}
async function concluirRequisito(req, res) {
    const id = Number(req.params.id);
    const requisito = await prisma.requisitoProgresso.update({
        where: { id },
        data: {
            concluido: true,
            dataAvaliacao: new Date(),
            avaliadoPor: "Instrutor",
        },
    });
    await service.recalcularProgresso(requisito.classeProgressoId);
    res.json(requisito);
}
async function listAll(req, res) {
    const lista = await prisma.classeProgresso.findMany({
        include: {
            desbravador: true,
            classe: true,
        },
    });
    res.json(lista);
}
