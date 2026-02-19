import prisma from "../../config/prisma";

export class ProgressoService {
  async concluir(desbravadorId: string, requisitoId: string, user: any) {
    // Verificar se o desbravador pertence ao clube
    const desbravador = await prisma.desbravador.findFirst({ where: { id: desbravadorId, clubeId: user.clubeId } });
    if (!desbravador) throw new Error("Desbravador não encontrado");
    // Verificar se o requisito existe e pertence a uma classe do clube
    const requisito = await prisma.requisito.findFirst({
      where: { id: requisitoId, classe: { clubeId: user.clubeId } },
    });
    if (!requisito) throw new Error("Requisito não encontrado");

    return prisma.progresso.upsert({
      where: { desbravadorId_requisitoId: { desbravadorId, requisitoId } },
      update: { concluido: true },
      create: { desbravadorId, requisitoId, concluido: true },
    });
  }

  async listar(desbravadorId: string, user: any) {
    const desbravador = await prisma.desbravador.findFirst({ where: { id: desbravadorId, clubeId: user.clubeId } });
    if (!desbravador) throw new Error("Desbravador não encontrado");
    return prisma.progresso.findMany({
      where: { desbravadorId },
      include: { requisito: true },
    });
  }

  async remover(desbravadorId: string, requisitoId: string, user: any) {
    const progresso = await prisma.progresso.findFirst({
      where: { desbravadorId, requisitoId, desbravador: { clubeId: user.clubeId } },
    });
    if (!progresso) throw new Error("Progresso não encontrado");
    return prisma.progresso.delete({
      where: { desbravadorId_requisitoId: { desbravadorId, requisitoId } },
    });
  }
}