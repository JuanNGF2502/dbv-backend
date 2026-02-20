import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 API DBV rodando");
});

app.get("/seed", async (req: Request, res: Response) => {
  try {
    // 🔥 Limpar banco
    await prisma.progresso.deleteMany();
    await prisma.requisito.deleteMany();
    await prisma.desbravador.deleteMany();
    await prisma.classe.deleteMany();
    await prisma.user.deleteMany();
    await prisma.clube.deleteMany();

    // 🏕 Criar clube
    const clube = await prisma.clube.create({
      data: { nome: "Clube Teste MVP" },
    });

    // 🔐 Criar admin com senha hash
    const senhaHash = await bcrypt.hash("123456", 10);

    await prisma.user.create({
      data: {
        nome: "Admin Geral",
        email: "admin@dbv.com",
        senha: senhaHash,
        role: "ADMIN",
        clubeId: clube.id,
      },
    });

    // 📚 Criar classes
    const classesData = [
      { nome: "Amigo" },
      { nome: "Companheiro" },
      { nome: "Pesquisador" },
      { nome: "Pioneiro" },
      { nome: "Excursionista" },
      { nome: "Guia" },
    ];

    for (const classeData of classesData) {
      await prisma.classe.create({
        data: {
          nome: classeData.nome,
          clubeId: clube.id,
        },
      });
    }

    res.json({
      message: "🌱 Seed executado com sucesso!",
      login: {
        email: "admin@dbv.com",
        senha: "123456",
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao criar seed",
      detalhe: error instanceof Error ? error.message : error,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server rodando na porta ${PORT}`);
});
