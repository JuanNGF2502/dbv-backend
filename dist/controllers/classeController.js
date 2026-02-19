"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.getById = getById;
exports.addRequisito = addRequisito;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function create(req, res) {
    const { nome, ordem, idadeMin, idadeMax } = req.body;
    const classe = await prisma.classe.create({
        data: { nome, ordem, idadeMin, idadeMax },
    });
    res.json(classe);
}
async function list(req, res) {
    const classes = await prisma.classe.findMany({
        orderBy: { ordem: "asc" },
    });
    res.json(classes);
}
async function getById(req, res) {
    const id = Number(req.params.id);
    const classe = await prisma.classe.findUnique({
        where: { id },
        include: { requisitos: true },
    });
    if (!classe)
        return res.status(404).json({ error: "Classe não encontrada" });
    res.json(classe);
}
async function addRequisito(req, res) {
    const classeId = Number(req.params.id);
    const { descricao } = req.body;
    const requisito = await prisma.classeRequisito.create({
        data: { descricao, classeId },
    });
    res.json(requisito);
}
