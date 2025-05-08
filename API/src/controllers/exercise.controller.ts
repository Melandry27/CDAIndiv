import { Request, Response } from "express";
import { BreathingExerciseService } from "../services/exercise.service";

const breathingExerciseService = new BreathingExerciseService();

export class BreathingExerciseController {
  async create(req: Request, res: Response) {
    try {
      const { name, description, duration, level, categoryIds, adminId } =
        req.body;

      const audioFile = req.files && (req.files as any)["audio"]?.[0];
      const imageFile = req.files && (req.files as any)["image"]?.[0];

      const breathingExercise =
        await breathingExerciseService.createBreathingExercise({
          name,
          description,
          duration: Number(duration),
          level,
          categoryIds,
          adminId,
          audioUrl: audioFile?.path,
          imageUrl: imageFile?.path,
        });

      res.status(201).json(breathingExercise);
    } catch (error) {
      console.error("Erreur création exercice :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'exercice" });
    }
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
    try {
      const { name, description, duration, level, categoryIds } = req.body;

      const { id } = req.params;

      const audioFile = req.files && (req.files as any)["audio"]?.[0];
      const imageFile = req.files && (req.files as any)["image"]?.[0];

      if (!audioFile && !imageFile) {
        return res.status(400).json({
          error: "Aucun fichier audio ou image fourni pour la mise à jour",
        });
      }

      const updatedExercise =
        await breathingExerciseService.updateBreathingExercise(id, {
          name,
          description,
          duration: duration ? Number(duration) : undefined,
          level,
          categoryIds,
          audioUrl: audioFile?.path,
          imageUrl: imageFile?.path,
        });

      res.json(updatedExercise);
    } catch (error) {
      console.error("Erreur mise à jour exercice :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'exercice" });
    }
  }

  async delete(req: Request, res: Response) {
    await breathingExerciseService.deleteBreathingExercise(req.params.id);
    res.status(204).send();
  }
}
