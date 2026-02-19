import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

export class UserService {
  async createDiretor(data: any, user: any) {
    if (user.role !== "ADMIN") throw new Error("Apenas ADMIN pode criar Diretor");
    const senha = await bcrypt.hash(data.senha, 10);
    return prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha,
        role: "DIRETOR",
        clubeId: user.clubeId,
      },
    });
  }

  async createInstrutor(data: any, user: any) {
    if (user.role !== "DIRETOR") throw new Error("Apenas Diretor pode criar Instrutor");
    const senha = await bcrypt.hash(data.senha, 10);
    return prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha,
        role: "INSTRUTOR",
        clubeId: user.clubeId,
      },
    });
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true, email: true, role: true, clubeId: true }
    });
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }
}