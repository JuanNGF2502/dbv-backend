import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import prisma from "./config/prisma";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/debug", (req, res) => {
  res.send("DEPLOY NOVO FUNCIONANDO");
});

// ✅ ROTA SEED PRIMEIRO
app.get("/seed", async (req, res) => {
  try {
    // Verifica se já existe admin
    const existing = await prisma.user.findUnique({
      where: { email: "admin@dbv.com" }
    });

    if (existing) {
      return res.json({ message: "Admin já existe" });
    }

    // Cria clube primeiro
    const clube = await prisma.clube.create({
      data: {
        nome: "Clube Central"
      }
    });

    // Agora cria admin vinculado ao clube criado
    const user = await prisma.user.create({
      data: {
        nome: "Admin",
        email: "admin@dbv.com",
        senha: "123456",
        role: "ADMIN",
        clubeId: clube.id
      }
    });

    return res.json({ message: "Admin criado", user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar seed" });
  }
});





// ✅ DEPOIS as rotas normais
app.use(routes);

app.listen(3000, () => {
  console.log("🚀 Server rodando na porta 3000");
});
