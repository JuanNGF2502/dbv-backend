"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarClasse = iniciarClasse;
exports.recalcularProgresso = recalcularProgresso;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function iniciarClasse(desbravadorId, classeId, obrigatoria) {
    const progresso = await prisma.classeProgresso.create({
        data: { desbravadorId, classeId, obrigatoria },
    });
    const requisitos = await prisma.classeRequisito.findMany({
        where: { classeId },
    });
    for (const req of requisitos) {
        await prisma.requisitoProgresso.create({
            data: {
                classeProgressoId: progresso.id,
                requisitoId: req.id,
            },
        });
    }
    return progresso;
}
async function recalcularProgresso(classeProgressoId) {
    const total = await prisma.requisitoProgresso.count({
        where: { classeProgressoId },
    });
    const concluidos = await prisma.requisitoProgresso.count({
        where: { classeProgressoId, concluido: true },
    });
    const porcentagem = total === 0 ? 0 : Math.round((concluidos / total) * 100);
    await prisma.classeProgresso.update({
        where: { id: classeProgressoId },
        data: {
            porcentagem,
            concluidoEm: porcentagem === 100 ? new Date() : null,
        },
    });
}
