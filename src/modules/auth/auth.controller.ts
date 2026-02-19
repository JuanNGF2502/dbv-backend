import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const result = await service.login(email, senha);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}
