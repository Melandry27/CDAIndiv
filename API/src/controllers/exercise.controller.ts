import { Request, Response } from "express";
import { BreathingExerciseService } from "../services/exercise.service";

const breathingExerciseService = new BreathingExerciseService();

export class BreathingExerciseController {
  async create(req: Request, res: Response) {
    const breathingExercise =
      await breathingExerciseService.createBreathingExercise(req.body);
    res.status(201).json(breathingExercise);
  }

  async getAll(req: Request, res: Response) {
    const breathingExercises =
      await breathingExerciseService.getAllBreathingExercises();
    res.json(breathingExercises);
  }

  async getById(req: Request, res: Response) {
    const breathingExercise =
      await breathingExerciseService.getBreathingExerciseById(req.params.id);
    if (!breathingExercise)
      return res.status(404).json({ message: "BreathingExercise not found" });
    res.json(breathingExercise);
  }

  async update(req: Request, res: Response) {
    const breathingExercise =
      await breathingExerciseService.updateBreathingExercise(
        req.params.id,
        req.body
      );
    res.json(breathingExercise);
  }

  async delete(req: Request, res: Response) {
    await breathingExerciseService.deleteBreathingExercise(req.params.id);
    res.status(204).send();
  }
}
