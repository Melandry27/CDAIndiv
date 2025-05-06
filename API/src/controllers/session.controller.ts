import { Request, Response } from "express";
import { ExerciseSessionService } from "../services/session.service";

const exerciseSessionService = new ExerciseSessionService();

export class ExerciseSessionController {
  async create(req: Request, res: Response) {
    const exerciseSession = await exerciseSessionService.createExerciseSession(
      req.body
    );
    res.status(201).json(exerciseSession);
  }

  async getAll(req: Request, res: Response) {
    const exerciseSessions =
      await exerciseSessionService.getAllExerciseSessions();
    res.json(exerciseSessions);
  }

  async getById(req: Request, res: Response) {
    const exerciseSession = await exerciseSessionService.getExerciseSessionById(
      req.params.id
    );
    if (!exerciseSession)
      return res.status(404).json({ message: "ExerciseSession not found" });
    res.json(exerciseSession);
  }

  async update(req: Request, res: Response) {
    const exerciseSession = await exerciseSessionService.updateExerciseSession(
      req.params.id,
      req.body
    );
    res.json(exerciseSession);
  }

  async delete(req: Request, res: Response) {
    await exerciseSessionService.deleteExerciseSession(req.params.id);
    res.status(204).send();
  }
}
