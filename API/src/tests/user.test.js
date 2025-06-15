import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
const prisma = new PrismaClient();
describe("User API", () => {
    let userId;
    beforeEach(async () => {
        await prisma.exerciseSession.deleteMany();
        await prisma.favorite.deleteMany();
        await prisma.history.deleteMany();
        await prisma.user.deleteMany();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
    const mockUser = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123", // Ensure this matches the password validation rules in your API
        phoneNumber: "0600000000",
        address: "1 rue de Test",
        dateOfBirth: new Date("1990-01-01").toISOString(),
    };
    afterAll(async () => {
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });
    it("should create a user", async () => {
        const res = await request(app).post("/api/users").send(mockUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(mockUser.email);
        console.log("User created:", res.body);
        userId = res.body.id;
    });
    it("should get all users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("should get user by id", async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(userId);
    });
    it("should update user", async () => {
        const updatedData = { name: "Updated Name" };
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .send(updatedData);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated Name");
    });
    it("should delete user", async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.status).toBe(204);
    });
    it("should return 404 for non-existent user", async () => {
        const res = await request(app).get(`/api/users/nonexistent-id`);
        expect(res.status).toBe(404);
    });
});
