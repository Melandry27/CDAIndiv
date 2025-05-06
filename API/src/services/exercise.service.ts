import prisma from "../prisma/client";

export class BreathingExerciseService {
  async createBreathingExercise(data: {
    name: string;
    description: string;
    duration: number;
    level: string;
    adminId: string;
  }) {
    return prisma.breathingExercise.create({
      data,
    });
  }

  async getAllBreathingExercises() {
    return prisma.breathingExercise.findMany({
      include: {
        admin: true,
      },
    });
  }

  async getBreathingExerciseById(id: string) {
    return prisma.breathingExercise.findUnique({
      where: { id },
      include: {
        admin: true,
      },
    });
  }

  async updateBreathingExercise(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      duration: number;
      level: string;
      adminId: string;
    }>
  ) {
    return prisma.breathingExercise.update({
      where: { id },
      data,
    });
  }

  async deleteBreathingExercise(id: string) {
    return prisma.breathingExercise.delete({
      where: { id },
    });
  }
}
