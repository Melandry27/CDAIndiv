process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("Admin API", () => {
  let adminId = "";

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
    // Clean up the database before running tests
    await prisma.admin.deleteMany();
  });

  afterAll(async () => {
    // Clean up the database after running tests
    await prisma.admin.deleteMany();
    await prisma.$disconnect();
  });

  it("should create an admin", async () => {
    const res = await request(app).post("/api/admins").send({
      name: "Test Admin",
      email: "testadmin@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Admin");
    expect(res.body.email).toBe("testadmin@example.com");

    adminId = res.body.id; // Store the created admin ID for later tests
  });

  it("should get all admins", async () => {
    const res = await request(app).get("/api/admins");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an admin by ID", async () => {
    const res = await request(app).get(`/api/admins/${adminId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(adminId);
    expect(res.body.name).toBe("Test Admin");
  });

  it("should update an admin", async () => {
    const updatedName = "Updated Admin";
    const res = await request(app).put(`/api/admins/${adminId}`).send({
      name: updatedName,
    });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedName);
  });

  it("should delete an admin", async () => {
    const res = await request(app).delete(`/api/admins/${adminId}`);
    expect(res.status).toBe(204);

    // Verify the admin no longer exists
    const getRes = await request(app).get(`/api/admins/${adminId}`);
    expect(getRes.status).toBe(404);
  });
});
