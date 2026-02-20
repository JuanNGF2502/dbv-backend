import { Request, Response } from "express";
import { DesbravadorService } from "./desbravador.service";
import { getParam } from "../../utils/param";

const service = new DesbravadorService();

export class DesbravadorController {
  async listar(req: Request, res: Response) {
    try {
      const result = await service.listar(req.user);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async detalhar(req: Request, res: Response) {
    const id = getParam(req.params.id);

    try {
      const result = await service.detalhar(id, req.user);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body, req.user);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async atualizarProgresso(req: Request, res: Response) {
  try {
    const id = getParam(req.params.id);
    const { concluido } = req.body;

    const result = await service.atualizarProgresso(
      id,
      concluido
    );

    return res.json(result);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

}