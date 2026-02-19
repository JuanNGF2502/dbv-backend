import { Request, Response } from "express";
import { RequisitoService } from "./requisito.service";

const service = new RequisitoService();

export class RequisitoController {
  async listarPorClasse(req: Request, res: Response) {
    try {
      const result = await service.listarPorClasse(req.params.classeId, req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const result = await service.create(req.body, req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.update(id, req.body, req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.delete(id, req.user);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}