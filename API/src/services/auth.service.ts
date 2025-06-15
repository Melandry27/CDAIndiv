import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { UserCreateInput } from "../types/User";

const jwtSecret = process.env.JWT_SECRET;

export class AuthService {
  async signup(data: UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber || "N/A",
        address: data.address || "N/A",
        dateOfBirth: data.dateOfBirth || new Date(0),
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      jwtSecret || "your_jwt_secret",
      {
        expiresIn: "1d",
      }
    );

    return { token };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email not found");
    }

    return { message: `A password reset link would be sent to ${email}` };
  }

  async loginAdmin(email: string, password: string) {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      jwtSecret || "your_jwt_secret",
      {
        expiresIn: "1d",
      }
    );

    return { token };
  }

  async deleteUserAndRelatedData(userId: string) {
    await prisma.exerciseSession.deleteMany({ where: { userId } });
    await prisma.favorite.deleteMany({ where: { userId } });
    await prisma.history.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
  }
}
