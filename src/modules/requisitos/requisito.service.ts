import prisma from "../../config/prisma";

export class RequisitoService {
  async listarPorClasse(classeId: string, user: any) {
    // Qualquer um pode listar (desde que tenha acesso à classe)
    return prisma.requisito.findMany({
      where: {
        classeId,
        classe: {
          clubeId: user.clubeId,
        },
      },
    });
  }

  async create(data: any, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode criar requisitos");
    }
    return prisma.requisito.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        classeId: data.classeId,
      },
    });
  }

  async update(id: string, data: any, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode editar requisitos");
    }
    const requisito = await prisma.requisito.findFirst({
      where: { id, classe: { clubeId: user.clubeId } },
    });
    if (!requisito) {
      throw new Error("Requisito não encontrado ou não pertence ao seu clube");
    }
    return prisma.requisito.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
      },
    });
  }

  async delete(id: string, user: any) {
    if (user.role !== "ADMIN") {
      throw new Error("Apenas ADMIN pode excluir requisitos");
    }
    const requisito = await prisma.requisito.findFirst({
      where: { id, classe: { clubeId: user.clubeId } },
    });
    if (!requisito) {
      throw new Error("Requisito não encontrado ou não pertence ao seu clube");
    }
    // Opcional: verificar progressos vinculados
    const progressos = await prisma.progresso.count({
      where: { requisitoId: id },
    });
    if (progressos > 0) {
      throw new Error("Não é possível excluir um requisito com progressos vinculados");
    }
    return prisma.requisito.delete({ where: { id } });
  }
}