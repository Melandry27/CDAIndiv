import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const adminController = new AdminController();

router.post("/", adminController.create.bind(adminController));
router.get("/", adminController.getAll.bind(adminController));
router.get("/:id", adminController.getById.bind(adminController));
router.put("/:id", adminController.update.bind(adminController));
router.delete("/:id", adminController.delete.bind(adminController));

export default router;
