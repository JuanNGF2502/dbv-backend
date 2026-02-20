import { Request, Response } from "express";
import { ClassService } from "./class.service";
import { getParam } from "../../utils/param";


const service = new ClassService();


export class ClassController {
  async listar(req: Request, res: Response) {
    const result = await service.listar(req.user!);
    return res.json(result);
  }

  async atualizar(req: Request, res: Response) {
    const id = getParam(req.params.id);
    const result = await service.atualizar(
      id,
      req.body,
      req.user!
    );
    return res.json(result);
  }

  async deletar(req: Request, res: Response) {
    const id = getParam(req.params.id);
    const result = await service.deletar(
      id,
      req.user!
    );
    return res.json(result);
  }

  async create(req: Request, res: Response) {
    const result = await service.create(req.body, req.user!);
    return res.json(result);
  }




  async listarInstrutores(req: Request, res: Response) {
    try {
      if (!req.user?.clubeId) {
        return res.status(400).json({ error: "Clube não encontrado" });
      }

      const result = await service.listarInstrutores(req.user.clubeId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async vincularInstrutor(req: Request, res: Response) {
    try {
      const { classeId, instrutorId } = req.body;
      const result = await service.vincularInstrutor(classeId, instrutorId, req.user!);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async desvincularInstrutor(req: Request, res: Response) {
  try {
    const classeId = getParam(req.params.id);

    const result = await service.desvincularInstrutor(
      classeId,
      req.user!
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

}
