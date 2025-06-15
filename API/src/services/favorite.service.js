import prisma from "../prisma/client";
export class FavoriteService {
    async getAllFavorites() {
        return prisma.favorite.findMany({
            include: { user: true, exercise: true },
        });
    }
    async getFavoriteById(id) {
        return prisma.favorite.findUnique({
            where: { id },
            include: { user: true, exercise: true },
        });
    }
    async getFavoritesByUser(userId) {
        return prisma.favorite.findMany({
            where: { userId },
            include: { exercise: true },
        });
    }
    async addFavorite(userId, exerciseId) {
        return prisma.favorite.create({
            data: { userId, exerciseId },
        });
    }
    async removeFavorite(id) {
        return prisma.favorite.delete({
            where: { id },
        });
    }
}
