import bcrypt from "bcryptjs";
import prisma from "../prisma/client";

export class AdminService {
  async createAdmin(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    return prisma.admin.create({ data });
  }

  async getAllAdmins() {
    return prisma.admin.findMany();
  }

  async getAdminById(id: string) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  async updateAdmin(
    id: string,
    data: Partial<{ name: string; email: string; password: string }>
  ) {
    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  async deleteAdmin(id: string) {
    return prisma.admin.delete({
      where: { id },
    });
  }
}
