import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("Favorite API", () => {
	let userId = "";
	let exerciseId = "";
	let favoriteId = "";

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
		// Clean up the database and create a user and exercise for testing
		await prisma.favorite.deleteMany();
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
				email: "adminuser@example.com",
				password: "adminpassword123",
			},
		});

		if (!admin.id) {
			throw new Error("Admin ID is undefined");
		}
		const adminId = admin.id; // Directly access admin.id as it is guaranteed to exist

		const exercise = await prisma.breathingExercise.create({
			data: {
				name: "Test Exercise",
				description: "A test exercise",
				duration: 10,
				level: "Beginner",
				adminId: adminId, // Use the created admin's ID
			},
		});

		userId = user.id;
		exerciseId = exercise.id;
	});

	afterAll(async () => {
		// Clean up the database after running tests
		await prisma.favorite.deleteMany();
		await prisma.user.deleteMany();
		await prisma.breathingExercise.deleteMany();
		await prisma.$disconnect();
	});

	it("should add a favorite", async () => {
		const res = await request(app).post("/api/favorites").send({
			userId,
			exerciseId,
		});

		expect(res.status).toBe(201);
		expect(res.body.userId).toBe(userId);
		expect(res.body.exerciseId).toBe(exerciseId);

		favoriteId = res.body.id; // Store the created favorite ID for later tests
	});

	it("should get all favorites", async () => {
		const res = await request(app).get("/api/favorites");
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should get favorites by user ID", async () => {
		const res = await request(app).get(`/api/favorites/user/${userId}`);
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body[0].userId).toBe(userId);
	});

	it("should delete a favorite", async () => {
		const res = await request(app).delete(`/api/favorites/${favoriteId}`);
		expect(res.status).toBe(204);

		// Verify the favorite no longer exists
		const getRes = await request(app).get(`/api/favorites/user/${userId}`);
		expect(getRes.status).toBe(200);
		expect(
			getRes.body.find((fav: any) => fav.id === favoriteId),
		).toBeUndefined();
	});
});
