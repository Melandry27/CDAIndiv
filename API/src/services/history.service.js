import prisma from "../prisma/client";
export class HistoryService {
    async createHistory(data) {
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
    async getHistoryById(id) {
        return prisma.history.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });
    }
    async updateHistory(id, data) {
        return prisma.history.update({
            where: { id },
            data,
        });
    }
    async deleteHistory(id) {
        return prisma.history.delete({
            where: { id },
        });
    }
}
