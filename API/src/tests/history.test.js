import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
const prisma = new PrismaClient();
describe("History API", () => {
    let historyId = "";
    let userId = "";
    beforeEach(async () => {
        await prisma.exerciseSession.deleteMany();
        await prisma.favorite.deleteMany();
        await prisma.history.deleteMany();
        await prisma.user.deleteMany();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
    beforeAll(async () => {
        // Nettoyer la base de données et créer un utilisateur pour les tests
        await prisma.history.deleteMany();
        await prisma.user.deleteMany();
        const user = await prisma.user.create({
            data: {
                name: "Test User",
                email: "testuser@example.com",
                password: "password123",
                phoneNumber: "1234567890",
                address: "123 Test Street",
                dateOfBirth: new Date("1990-01-01"),
            },
        });
        userId = user.id;
    });
    afterAll(async () => {
        // Nettoyer la base de données après les tests
        await prisma.history.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });
    it("should create a history", async () => {
        const res = await request(app).post("/api/histories").send({
            registrationDate: new Date().toISOString(),
            comment: "Test history comment",
            userId,
        });
        expect(res.status).toBe(201);
        expect(res.body.comment).toBe("Test history comment");
        expect(res.body.userId).toBe(userId);
        historyId = res.body.id; // Stocker l'ID de l'historique créé pour les tests suivants
    });
    it("should get all histories", async () => {
        const res = await request(app).get("/api/histories");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("should get a history by ID", async () => {
        const res = await request(app).get(`/api/histories/${historyId}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(historyId);
        expect(res.body.comment).toBe("Test history comment");
    });
    it("should update a history", async () => {
        const updatedComment = "Updated history comment";
        const res = await request(app).put(`/api/histories/${historyId}`).send({
            comment: updatedComment,
        });
        expect(res.status).toBe(200);
        expect(res.body.comment).toBe(updatedComment);
    });
    it("should delete a history", async () => {
        const res = await request(app).delete(`/api/histories/${historyId}`);
        expect(res.status).toBe(204);
        // Vérifier que l'historique n'existe plus
        const getRes = await request(app).get(`/api/histories/${historyId}`);
        expect(getRes.status).toBe(404);
    });
});
