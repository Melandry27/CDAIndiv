import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("ExerciseSession API", () => {
  let sessionId = "";
  let userId = "";
  let exerciseId = "";

  beforeAll(async () => {
    // Nettoyer la base de données et créer un utilisateur et un exercice pour les tests
    await prisma.exerciseSession.deleteMany();
    await prisma.user.deleteMany();
    await prisma.breathingExercise.deleteMany();

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

    const admin = await prisma.admin.create({
      data: {
        name: "Admin User",
        email: "adminuse22r@example.com",
        password: "adminpassword123",
      },
    });

    const exercise = await prisma.breathingExercise.create({
      data: {
        name: "Test Exercise",
        description: "A test exercise",
        duration: 10,
        level: "Beginner",
        adminId: admin.id,
      },
    });

    userId = user.id;
    exerciseId = exercise.id;
  });

  afterAll(async () => {
    await prisma.exerciseSession.deleteMany();
    await prisma.user.deleteMany();
    await prisma.breathingExercise.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.$disconnect();
  });

  it("should create an exercise session", async () => {
    const res = await request(app).post("/api/sessions").send({
      sessionDateTime: new Date().toISOString(),
      performedDuration: 15,
      userId,
      exerciseId,
    });

    expect(res.status).toBe(201);
    expect(res.body.performedDuration).toBe(15);
    expect(res.body.userId).toBe(userId);
    expect(res.body.exerciseId).toBe(exerciseId);

    sessionId = res.body.id; // Stocker l'ID de la session créée pour les tests suivants
  });

  it("should get all exercise sessions", async () => {
    const res = await request(app).get("/api/sessions");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an exercise session by ID", async () => {
    const res = await request(app).get(`/api/sessions/${sessionId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(sessionId);
    expect(res.body.userId).toBe(userId);
    expect(res.body.exerciseId).toBe(exerciseId);
  });

  it("should update an exercise session", async () => {
    const updatedDuration = 20;
    const res = await request(app).put(`/api/sessions/${sessionId}`).send({
      performedDuration: updatedDuration,
    });

    expect(res.status).toBe(200);
    expect(res.body.performedDuration).toBe(updatedDuration);
  });

  it("should delete an exercise session", async () => {
    const res = await request(app).delete(`/api/sessions/${sessionId}`);
    expect(res.status).toBe(204);

    // Vérifier que la session n'existe plus
    const getRes = await request(app).get(`/api/sessions/${sessionId}`);
    expect(getRes.status).toBe(404);
  });
});
