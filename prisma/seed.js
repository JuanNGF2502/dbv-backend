"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    // Limpar dados antigos
    await prisma.requisitoProgresso.deleteMany();
    await prisma.classeProgresso.deleteMany();
    await prisma.classeRequisito.deleteMany();
    await prisma.classe.deleteMany();
    // Criar Classes
    const amigo = await prisma.classe.create({
        data: {
            nome: "Amigo",
            ordem: 1,
            idadeMin: 10,
            idadeMax: 10,
            requisitos: {
                create: [
                    { descricao: "Memorizar João 3:16" },
                    { descricao: "Conhecer a história do clube" },
                ],
            },
        },
    });
    const companheiro = await prisma.classe.create({
        data: {
            nome: "Companheiro",
            ordem: 2,
            idadeMin: 11,
            idadeMax: 11,
            requisitos: {
                create: [
                    { descricao: "Memorizar Salmo 23" },
                    { descricao: "Aprender nós básicos" },
                ],
            },
        },
    });
    const pesquisador = await prisma.classe.create({
        data: {
            nome: "Pesquisador",
            ordem: 3,
            idadeMin: 12,
            idadeMax: 12,
            requisitos: {
                create: [
                    { descricao: "Memorizar Mateus 5:9" },
                    { descricao: "Estudo sobre natureza" },
                ],
            },
        },
    });
    console.log("Seed executado com sucesso 🚀");
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
