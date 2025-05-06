import { Router } from "express";
import { HistoryController } from "../controllers/history.controller";

const router = Router();
const historyController = new HistoryController();

router.post("/", historyController.create.bind(historyController));
router.get("/", historyController.getAll.bind(historyController));
router.get("/:id", historyController.getById.bind(historyController));
router.put("/:id", historyController.update.bind(historyController));
router.delete("/:id", historyController.delete.bind(historyController));

export default router;
