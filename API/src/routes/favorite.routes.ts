import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller";

const router = Router();
const favoriteController = new FavoriteController();

router.get("/", favoriteController.getAll.bind(favoriteController));
router.get("/:id", favoriteController.getById.bind(favoriteController));
router.get(
  "/user/:userId",
  favoriteController.getByUser.bind(favoriteController)
);

router.post("/", favoriteController.create.bind(favoriteController));
router.delete("/:id", favoriteController.delete.bind(favoriteController));

export default router;
