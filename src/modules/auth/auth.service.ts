import prisma from "../../../src/config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async login(email: string, senha: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) throw new Error("Senha inválida");

    const token = jwt.sign(
      { id: user.id, role: user.role, clubeId: user.clubeId },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { token };
  }
}
