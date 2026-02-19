import { Request, Response } from "express";
import { ClassService } from "./class.service";

const service = new ClassService();

export class ClassController {
  async listar(req: Request, res: Response) {
    const result = await service.listar(req.user);
    return res.json(result);
  }

  async atualizar(req: Request, res: Response) {
    const result = await service.atualizar(
      req.params.id,
      req.body,
      req.user
    );
    return res.json(result);
  }

  async deletar(req: Request, res: Response) {
    const result = await service.deletar(
      req.params.id,
      req.user
    );
    return res.json(result);
  }

  async create(req: Request, res: Response) {
  const result = await service.create(req.body, req.user);
  return res.json(result);
}

async vincularInstrutor(req: Request, res: Response) {
  const result = await service.vincularInstrutor(req.body, req.user);
  return res.json(result);
}


async listarInstrutores(req: Request, res: Response) {
  try {
    const result = await service.listarInstrutores(req.user.clubeId);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

async vincularInstrutor(req: Request, res: Response) {
  try {
    const { classeId, instrutorId } = req.body;
    const result = await service.vincularInstrutor(classeId, instrutorId, req.user);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

async desvincularInstrutor(req: Request, res: Response) {
  try {
    const { classeId } = req.params;
    const result = await service.desvincularInstrutor(classeId, req.user);
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

}
