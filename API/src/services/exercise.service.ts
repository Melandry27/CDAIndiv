import prisma from "../prisma/client";

export class BreathingExerciseService {
  async createBreathingExercise(data: {
    name: string;
    description: string;
    duration: number;
    level: string;
    categoryIds: string[];
    adminId: string;
  }) {
    const { categoryIds, ...rest } = data;

    return prisma.breathingExercise.create({
      data: {
        ...rest,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
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
      categoryIds: string[];
    }>
  ) {
    const { categoryIds, ...rest } = data;

    return prisma.breathingExercise.update({
      where: { id },
      data: {
        ...rest,
        ...(categoryIds && {
          categories: {
            set: categoryIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  async deleteBreathingExercise(id: string) {
    return prisma.breathingExercise.delete({
      where: { id },
    });
  }
}
