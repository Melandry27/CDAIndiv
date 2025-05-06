import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const user = await authService.signup(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const message = await authService.forgotPassword(email);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async loginAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await authService.loginAdmin(email, password);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
