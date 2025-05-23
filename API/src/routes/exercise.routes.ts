import { Router } from "express";
import { BreathingExerciseController } from "../controllers/exercise.controller";
import { upload } from "../middlewares/uploads";

const router = Router();
const breathingExerciseController = new BreathingExerciseController();

router.post(
  "/",
  upload.fields([{ name: "audio" }, { name: "image" }]),
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
  upload.fields([{ name: "audio" }, { name: "image" }]),
  breathingExerciseController.update.bind(breathingExerciseController)
);
router.delete(
  "/:id",
  breathingExerciseController.delete.bind(breathingExerciseController)
);

export default router;
