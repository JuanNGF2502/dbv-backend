import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class UserController {
  async createDiretor(req: Request, res: Response) {
    try {
      const result = await service.createDiretor(req.body, req.user!);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async createInstrutor(req: Request, res: Response) {
    try {
      const result = await service.createInstrutor(req.body, req.user!);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const user = await service.getMe(req.user!.id);
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}