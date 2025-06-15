import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
export class AdminService {
    async createAdmin(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        return prisma.admin.create({ data });
    }
    async getAllAdmins() {
        return prisma.admin.findMany();
    }
    async getAdminById(id) {
        return prisma.admin.findUnique({
            where: { id },
        });
    }
    async updateAdmin(id, data) {
        return prisma.admin.update({
            where: { id },
            data,
        });
    }
    async deleteAdmin(id) {
        return prisma.admin.delete({
            where: { id },
        });
    }
}
