// src/modules/classes/class.service.ts
import prisma from "../../config/prisma";

export class ClassService {
  async create(data: any, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode criar classes");
    }
    return prisma.classe.create({
      data: {
        nome: data.nome,
        clubeId: user.clubeId,
        instrutorId: data.instrutorId || null,
      },
    });
  }

  async listar(user: any) {
    // ADMIN e DIRETOR podem listar
    return prisma.classe.findMany({
      where: { clubeId: user.clubeId },
      include: { instrutor: true, desbravadores: true, requisitos: true },
    });
  }

  async atualizar(id: string, data: any, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode editar classes");
    }
    const classe = await prisma.classe.findFirst({ where: { id, clubeId: user.clubeId } });
    if (!classe) throw new Error("Classe não encontrada");
    return prisma.classe.update({
      where: { id },
      data: { nome: data.nome, instrutorId: data.instrutorId },
    });
  }

  async deletar(id: string, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode excluir classes");
    }
    const classe = await prisma.classe.findFirst({ where: { id, clubeId: user.clubeId } });
    if (!classe) throw new Error("Classe não encontrada");
    // Verificar se há desbravadores ou requisitos vinculados
    const countDesbravadores = await prisma.desbravador.count({ where: { classeId: id } });
    if (countDesbravadores > 0) throw new Error("Existem desbravadores nesta classe, não é possível deletar");
    const countRequisitos = await prisma.requisito.count({ where: { classeId: id } });
    if (countRequisitos > 0) throw new Error("Existem requisitos nesta classe, não é possível deletar");
    return prisma.classe.delete({ where: { id } });
  }

  async listarInstrutores(clubeId: string) {
  return prisma.user.findMany({
    where: { clubeId, role: 'INSTRUTOR' },
    select: { id: true, nome: true, email: true },
  });
}

async vincularInstrutor(classeId: string, instrutorId: string, user: any) {
  // Verifica se classe pertence ao clube
  const classe = await prisma.classe.findFirst({ where: { id: classeId, clubeId: user.clubeId } });
  if (!classe) throw new Error('Classe não encontrada');
  // Verifica se instrutor pertence ao clube e é instrutor
  const instrutor = await prisma.user.findFirst({ where: { id: instrutorId, clubeId: user.clubeId, role: 'INSTRUTOR' } });
  if (!instrutor) throw new Error('Instrutor inválido');
  return prisma.classe.update({
    where: { id: classeId },
    data: { instrutorId },
  });
}

async desvincularInstrutor(classeId: string, user: any) {
  const classe = await prisma.classe.findFirst({ where: { id: classeId, clubeId: user.clubeId } });
  if (!classe) throw new Error('Classe não encontrada');
  return prisma.classe.update({
    where: { id: classeId },
    data: { instrutorId: null },
  });
}
}