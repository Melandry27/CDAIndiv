import express from "express";
import { CategoryController } from "../controllers/category.controller";

const router = express.Router();
const controller = new CategoryController();

router.get("/", controller.getAll.bind(router));
router.get("/:id", controller.getById.bind(router));
router.post("/", controller.create.bind(router));
router.put("/:id", controller.update.bind(router));
router.delete("/:id", controller.delete.bind(router));

export default router;
