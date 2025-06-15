import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("Category API", () => {
	let categoryId = "";

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
		await prisma.category.deleteMany();
	});

	afterAll(async () => {
		// Clean up the database after running tests
		await prisma.category.deleteMany();
		await prisma.$disconnect();
	});

	it("should create a category", async () => {
		const res = await request(app).post("/api/categories").send({
			name: "Test Category",
			icon: "test-icon.png",
		});

		expect(res.status).toBe(201);
		expect(res.body.name).toBe("Test Category");
		expect(res.body.icon).toBe("test-icon.png");

		categoryId = res.body.id; // Store the created category ID for later tests
	});

	it("should get all categories", async () => {
		const res = await request(app).get("/api/categories");
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should get a category by ID", async () => {
		const res = await request(app).get(`/api/categories/${categoryId}`);
		expect(res.status).toBe(200);
		expect(res.body.id).toBe(categoryId);
		expect(res.body.name).toBe("Test Category");
	});

	it("should update a category", async () => {
		const updatedName = "Updated Test Category";
		const res = await request(app).put(`/api/categories/${categoryId}`).send({
			name: updatedName,
		});

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(updatedName);
	});

	it("should delete a category", async () => {
		const res = await request(app).delete(`/api/categories/${categoryId}`);
		expect(res.status).toBe(204);

		// Verify the category no longer exists
		const getRes = await request(app).get(`/api/categories/${categoryId}`);
		expect(getRes.status).toBe(404);
	});
});
