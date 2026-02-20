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
import bcrypt from "bcryptjs";

app.get("/seed", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const clube = await prisma.clube.create({
      data: { nome: "Clube Central" }
    });

    const user = await prisma.user.create({
      data: {
        nome: "Admin",
        email: "admin@dbv.com",
        senha: hashedPassword,
        role: "ADMIN",
        clubeId: clube.id
      }
    });

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar seed" });
  }
});






// ✅ DEPOIS as rotas normais
app.use(routes);

app.listen(3000, () => {
  console.log("🚀 Server rodando na porta 3000");
});
