import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }

  async getAll(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async getById(req: Request, res: Response): Promise<any> {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}
