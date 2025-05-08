import prisma from "../prisma/client";

export class CategoryService {
  async getAllCategories() {
    return prisma.category.findMany({
      include: { exercises: true },
    });
  }

  async getCategoryById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: { exercises: true },
    });
  }

  async createCategory(name: string, icon: string) {
    return prisma.category.create({
      data: { name, icon },
    });
  }

  async updateCategory(id: string, name: string) {
    try {
      return await prisma.category.update({
        where: { id },
        data: { name },
      });
    } catch {
      return null;
    }
  }

  async deleteCategory(id: string) {
    try {
      await prisma.category.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
