import prisma from "../prisma/client";
import { UserCreateInput } from "../types/User";

export class UserService {
  async createUser(data: UserCreateInput) {
    return prisma.user.create({ data });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: string,
    data: Partial<{ nom: string; email: string; motDePasse: string }>
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
