import prisma from "../prisma/client";

export class HistoryService {
  async createHistory(data: {
    registrationDate: Date;
    comment: string;
    userId: string;
  }) {
    return prisma.history.create({
      data,
    });
  }

  async getAllHistories() {
    return prisma.history.findMany({
      include: {
        user: true,
      },
    });
  }

  async getHistoryById(id: string) {
    return prisma.history.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async updateHistory(
    id: string,
    data: Partial<{
      registrationDate: Date;
      comment: string;
      userId: string;
    }>
  ) {
    return prisma.history.update({
      where: { id },
      data,
    });
  }

  async deleteHistory(id: string) {
    return prisma.history.delete({
      where: { id },
    });
  }
}
