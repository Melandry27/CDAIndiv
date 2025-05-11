import prisma from "../prisma/client";

export class FavoriteService {
  async getAllFavorites() {
    return prisma.favorite.findMany({
      include: { user: true, exercise: true },
    });
  }

  async getFavoriteById(id: string) {
    return prisma.favorite.findUnique({
      where: { id },
      include: { user: true, exercise: true },
    });
  }

  async getFavoritesByUser(userId: string) {
    return prisma.favorite.findMany({
      where: { userId },
      include: { exercise: true },
    });
  }

  async addFavorite(userId: string, exerciseId: string) {
    return prisma.favorite.create({
      data: { userId, exerciseId },
    });
  }

  async removeFavorite(id: string) {
    return prisma.favorite.delete({
      where: { id },
    });
  }
}
