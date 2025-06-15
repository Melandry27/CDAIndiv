import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
const JWT_SECRET = process.env.JWT_SECRET;
export class AuthService {
    async signup(data) {
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
    async login(email, password) {
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
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            address: user.address,
        }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return { token };
    }
    async forgotPassword(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("Email not found");
        }
        return { message: `A password reset link would be sent to ${email}` };
    }
    async loginAdmin(email, password) {
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
        const token = jwt.sign({ adminId: admin.id, email: admin.email }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return { token };
    }
    async deleteUserAndRelatedData(userId) {
        await prisma.exerciseSession.deleteMany({ where: { userId } });
        await prisma.favorite.deleteMany({ where: { userId } });
        await prisma.history.deleteMany({ where: { userId } });
        await prisma.user.delete({ where: { id: userId } });
    }
}
