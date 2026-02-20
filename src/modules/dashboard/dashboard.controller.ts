import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";
import prisma from "../../config/prisma";
import { getParam } from "../../utils/param";

const service = new DashboardService();

export class DashboardController {
  async progressoClasse(req: Request, res: Response) {
    const id = getParam(req.params.id);

    try {
      const result = await service.progressoClasse(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const user = req.user!;
      if (!user || !user.clubeId) {
        return res.status(400).json({ error: "Usuário não autenticado ou sem clube" });
      }
      const clubeId = user.clubeId;

      const totalDesbravadores = await prisma.desbravador.count({ where: { clubeId } });

      const desbravadores = await prisma.desbravador.findMany({
        where: { clubeId },
        include: { progressos: true }
      });

      let somaPercentual = 0;
      let countComProgresso = 0;
      desbravadores.forEach(d => {
        if (d.progressos && d.progressos.length > 0) {
          const totalRequisitos = d.progressos.length;
          const concluidos = d.progressos.filter((p: any) => p.concluido).length;
          const percentual = totalRequisitos > 0 ? (concluidos / totalRequisitos) * 100 : 0;
          somaPercentual += percentual;
          countComProgresso++;
        }
      });
      const mediaProgresso = countComProgresso > 0 ? somaPercentual / countComProgresso : 0;

      const ultimosProgressos = await prisma.progresso.findMany({
        where: { desbravador: { clubeId } },
        orderBy: { createdAt: 'desc' }, // ANTES: atualizadoEm
        take: 5,
        include: { desbravador: true, requisito: true }
      });

      const atividades = ultimosProgressos.map(p => ({
        id: p.id,
        desbravadorNome: p.desbravador?.nome || 'Desconhecido',
        requisitoDescricao: p.requisito?.descricao || '',
        data: p.createdAt // alterado
      }));

      return res.json({
        totalDesbravadores,
        mediaProgresso: Math.round(mediaProgresso * 100) / 100,
        ultimosProgressos: atividades
      });
    } catch (error: any) {
      console.error("Erro no dashboard:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}