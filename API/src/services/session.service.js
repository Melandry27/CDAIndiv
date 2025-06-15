import prisma from "../prisma/client";
export class ExerciseSessionService {
    async createExerciseSession(data) {
        return prisma.exerciseSession.create({
            data,
        });
    }
    async getAllExerciseSessions() {
        return prisma.exerciseSession.findMany({
            include: {
                user: true,
                exercise: true,
            },
        });
    }
    async getExerciseSessionById(id) {
        return prisma.exerciseSession.findUnique({
            where: { id },
            include: {
                user: true,
                exercise: true,
            },
        });
    }
    async updateExerciseSession(id, data) {
        return prisma.exerciseSession.update({
            where: { id },
            data,
        });
    }
    async deleteExerciseSession(id) {
        return prisma.exerciseSession.delete({
            where: { id },
        });
    }
}
