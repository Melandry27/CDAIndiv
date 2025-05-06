import { Router } from "express";
import { BreathingExerciseController } from "../controllers/exercise.controller";

const router = Router();
const breathingExerciseController = new BreathingExerciseController();

router.post(
  "/",
  breathingExerciseController.create.bind(breathingExerciseController)
);
router.get(
  "/",
  breathingExerciseController.getAll.bind(breathingExerciseController)
);
router.get(
  "/:id",
  breathingExerciseController.getById.bind(breathingExerciseController)
);
router.put(
  "/:id",
  breathingExerciseController.update.bind(breathingExerciseController)
);
router.delete(
  "/:id",
  breathingExerciseController.delete.bind(breathingExerciseController)
);

export default router;
