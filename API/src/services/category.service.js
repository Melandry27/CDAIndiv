import prisma from "../prisma/client";
export class CategoryService {
    async getAllCategories() {
        return prisma.category.findMany({
            include: { exercises: true },
        });
    }
    async getCategoryById(id) {
        return prisma.category.findUnique({
            where: { id },
            include: { exercises: true },
        });
    }
    async createCategory(name, icon) {
        return prisma.category.create({
            data: { name, icon },
        });
    }
    async updateCategory(id, name) {
        try {
            return await prisma.category.update({
                where: { id },
                data: { name },
            });
        }
        catch {
            return null;
        }
    }
    async deleteCategory(id) {
        try {
            await prisma.category.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
}
