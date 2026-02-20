import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import prisma from "./config/prisma";

dotenv.config();

const app = express();

app.use(express.json());

// ✅ ROTA SEED PRIMEIRO
app.get("/seed", async (req, res) => {
  await prisma.user.create({
    data: {
      nome: "Admin",
      email: "admin@dbv.com",
      senha: "123456",
      role: "ADMIN",
      clubeId: "1",
    }
  });

  res.send("Admin criado");
});

// ✅ DEPOIS as rotas normais
app.use(routes);

app.listen(3000, () => {
  console.log("🚀 Server rodando na porta 3000");
});
