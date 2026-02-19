import prisma from "../../config/prisma"; // caminho corrigido

export class DashboardService {
  async progressoClasse(classeId: string) {
    const totalRequisitos = await prisma.requisito.count({
      where: { classeId },
    });
    const totalConcluidos = await prisma.progresso.count({
      where: { requisito: { classeId }, concluido: true },
    });
    return {
      totalRequisitos,
      totalConcluidos,
      porcentagem: totalRequisitos === 0 ? 0 : Number(((totalConcluidos / totalRequisitos) * 100).toFixed(2)),
    };
  }
}