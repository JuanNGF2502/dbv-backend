import { Request, Response } from "express";
import { ProgressoService } from "./progresso.service";
import { getParam } from "../../utils/param";

const service = new ProgressoService();

export class ProgressoController {
  async concluir(req: Request, res: Response) {
    try {
      const { desbravadorId, requisitoId } = req.body;
      const result = await service.concluir(desbravadorId, requisitoId, req.user!);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async listar(req: Request, res: Response) {
  try {
    const desbravadorId = getParam(req.params.desbravadorId);

    const result = await service.listar(
      desbravadorId,
      req.user!
    );
    
    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}


  async remover(req: Request, res: Response) {
    try {
      const { desbravadorId, requisitoId } = req.body;
      const result = await service.remover(desbravadorId, requisitoId, req.user!);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}