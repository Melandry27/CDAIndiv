import { FavoriteService } from "../services/favorite.service";
const favoriteService = new FavoriteService();
export class FavoriteController {
    async getAll(req, res) {
        const favorites = await favoriteService.getAllFavorites();
        res.json(favorites);
    }
    async getById(req, res) {
        const { id } = req.params;
        const favorite = await favoriteService.getFavoriteById(id);
        if (!favorite) {
            return res.status(404).json({ message: "Favorite not found" });
        }
        res.json(favorite);
    }
    async getByUser(req, res) {
        const { userId } = req.params;
        const favorites = await favoriteService.getFavoritesByUser(userId);
        res.json(favorites);
    }
    async create(req, res) {
        const { userId, exerciseId } = req.body;
        const favorite = await favoriteService.addFavorite(userId, exerciseId);
        res.status(201).json(favorite);
    }
    async delete(req, res) {
        const { id } = req.params;
        await favoriteService.removeFavorite(id);
        res.status(204).send();
    }
}
