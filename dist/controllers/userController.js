"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.list = list;
exports.getById = getById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function create(req, res) {
    const { nome, email, password, dataNascimento } = req.body;
    const user = await prisma.user.create({
        data: {
            nome,
            email,
            password,
            dataNascimento: new Date(dataNascimento),
        },
    });
    res.json(user);
}
async function list(req, res) {
    const users = await prisma.user.findMany();
    res.json(users);
}
async function getById(req, res) {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
}
