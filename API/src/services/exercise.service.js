import prisma from "../prisma/client";
export class BreathingExerciseService {
    async createBreathingExercise(data) {
        const { categoryIds, name, description, duration, level, adminId, audioUrl, imageUrl, } = data;
        const parsedCategories = JSON.parse(categoryIds);
        return prisma.breathingExercise.create({
            data: {
                name,
                description,
                duration,
                level,
                adminId,
                audioUrl,
                imageUrl,
                categories: {
                    connect: parsedCategories.map((id) => ({ id })),
                },
            },
        });
    }
    async getAllBreathingExercises() {
        return prisma.breathingExercise.findMany({
            include: {
                admin: true,
                categories: true,
            },
        });
    }
    async getBreathingExerciseById(id) {
        return prisma.breathingExercise.findUnique({
            where: { id },
            include: {
                admin: true,
            },
        });
    }
    async updateBreathingExercise(id, data) {
        let parsedCategoryIds;
        if (typeof data.categoryIds === "string") {
            try {
                parsedCategoryIds = JSON.parse(data.categoryIds);
            }
            catch (error) {
                console.error("Échec du parsing de categoryIds :", error);
                parsedCategoryIds = [];
            }
        }
        else if (Array.isArray(data.categoryIds)) {
            parsedCategoryIds = data.categoryIds;
        }
        const { categoryIds, ...rest } = data;
        return prisma.breathingExercise.update({
            where: { id },
            data: {
                ...rest,
                ...(parsedCategoryIds && {
                    categories: {
                        set: parsedCategoryIds.map((id) => ({ id })),
                    },
                }),
            },
        });
    }
    async deleteBreathingExercise(id) {
        return prisma.breathingExercise.delete({
            where: { id },
        });
    }
}
