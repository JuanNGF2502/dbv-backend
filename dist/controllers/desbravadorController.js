"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.getById = getById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function create(req, res) {
    const { nome, unidade, userId } = req.body;
    const desbravador = await prisma.desbravador.create({
        data: { nome, unidade, userId },
    });
    res.json(desbravador);
}
async function list(req, res) {
    const lista = await prisma.desbravador.findMany({
        include: { user: true },
    });
    res.json(lista);
}
async function getById(req, res) {
    const id = Number(req.params.id);
    const desbravador = await prisma.desbravador.findUnique({
        where: { id },
        include: {
            user: true,
            progressos: {
                include: { classe: true },
            },
        },
    });
    if (!desbravador)
        return res.status(404).json({ error: "Desbravador não encontrado" });
    res.json(desbravador);
}
