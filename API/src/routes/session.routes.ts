import { Router } from "express";
import { ExerciseSessionController } from "../controllers/session.controller";

const router = Router();
const exerciseSessionController = new ExerciseSessionController();

router.post(
  "/",
  exerciseSessionController.create.bind(exerciseSessionController)
);
router.get(
  "/",
  exerciseSessionController.getAll.bind(exerciseSessionController)
);
router.get(
  "/:id",
  exerciseSessionController.getById.bind(exerciseSessionController)
);
router.put(
  "/:id",
  exerciseSessionController.update.bind(exerciseSessionController)
);
router.delete(
  "/:id",
  exerciseSessionController.delete.bind(exerciseSessionController)
);

export default router;
