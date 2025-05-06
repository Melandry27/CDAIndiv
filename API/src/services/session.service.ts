import prisma from "../prisma/client";

export class ExerciseSessionService {
  async createExerciseSession(data: {
    sessionDateTime: Date;
    performedDuration: number;
    userId: string;
    exerciseId: string;
  }) {
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

  async getExerciseSessionById(id: string) {
    return prisma.exerciseSession.findUnique({
      where: { id },
      include: {
        user: true,
        exercise: true,
      },
    });
  }

  async updateExerciseSession(
    id: string,
    data: Partial<{
      sessionDateTime: Date;
      performedDuration: number;
      userId: string;
      exerciseId: string;
    }>
  ) {
    return prisma.exerciseSession.update({
      where: { id },
      data,
    });
  }

  async deleteExerciseSession(id: string) {
    return prisma.exerciseSession.delete({
      where: { id },
    });
  }
}
