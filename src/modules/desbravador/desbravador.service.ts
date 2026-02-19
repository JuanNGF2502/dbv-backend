import prisma from "../../config/prisma";

export class DesbravadorService {
  async listar(user: any) {
    const where =
      user.role === "INSTRUTOR"
        ? { classe: { instrutorId: user.id } }
        : { clubeId: user.clubeId };

    const desbravadores = await prisma.desbravador.findMany({
      where,
      include: {
        classe: true,
        progressos: true,
      },
    });

    return desbravadores.map((d) => {
      const total = d.progressos.length;
      const concluidos = d.progressos.filter((p) => p.concluido).length;
      const porcentagem = total > 0 ? Math.round((concluidos / total) * 100) : 0;
      return { ...d, progresso: porcentagem };
    });
  }

  async detalhar(id: string, user: any) {
    return prisma.desbravador.findFirst({
      where: { id, clubeId: user.clubeId },
      include: {
        classe: true,
        progressos: { include: { requisito: true } },
      },
    });
  }

  async create(data: any, user: any) {
  // Validações básicas
  if (!data.classeId) {
    throw new Error("Classe é obrigatória");
  }

  // Verificar se a classe pertence ao clube do usuário
  const classe = await prisma.classe.findFirst({
    where: { id: data.classeId, clubeId: user.clubeId },
    include: { requisitos: true }
  });
  if (!classe) {
    throw new Error("Classe não encontrada ou não pertence ao seu clube");
  }

  // Criar desbravador e progressos em transação
  const result = await prisma.$transaction(async (tx) => {
    // Criar desbravador
    const desbravador = await tx.desbravador.create({
      data: {
        nome: data.nome,
        dataNascimento: new Date(data.dataNascimento),
        classeId: data.classeId,
        clubeId: user.clubeId,
      },
    });

    // Criar progressos para todos os requisitos da classe
    if (classe.requisitos && classe.requisitos.length > 0) {
      const progressosData = classe.requisitos.map((req: any) => ({
        desbravadorId: desbravador.id,
        requisitoId: req.id,
        concluido: false,
      }));
      await tx.progresso.createMany({
        data: progressosData,
      });
    }

    return desbravador;
  });

  return result;
}

  async atualizarProgresso(id: string, concluido: boolean) {
    return prisma.progresso.update({
      where: { id },
      data: { concluido },
    });
  }
}