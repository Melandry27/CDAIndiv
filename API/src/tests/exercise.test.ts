import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();

describe("BreathingExercise API", () => {
	let adminId = "";
	let exerciseId = "";

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
		// Supprimer l'admin existant pour éviter les conflits de clé unique
		await prisma.admin.deleteMany({
			where: {
				email: {
					equals: "admin@example.com",
					mode: "insensitive", // Ensure case-insensitive match
				},
			},
		});

		// Wait for the deletion to complete before creating a new admin
		const admin = await prisma.admin.create({
			data: {
				name: "Test Admin",
				email: "admin@example.com",
				password: "admin123",
			},
		});
		adminId = admin.id;
	});

	afterAll(async () => {
		// Nettoyer la base de données après les tests
		await prisma.breathingExercise.deleteMany();
		await prisma.admin.deleteMany();
		await prisma.$disconnect();
	});

	it("should create a breathing exercise", async () => {
		const audioPath = path.join(__dirname, "test-files", "sample.mp3");
		const imagePath = path.join(__dirname, "test-files", "sample.jpg");

		if (!fs.existsSync(audioPath) || !fs.existsSync(imagePath)) {
			console.error(
				"Test files are missing. Ensure 'sample.mp3' and 'sample.jpg' exist in the 'test-files' directory.",
			);
			process.exit(1);
		}

		const res = await request(app)
			.post("/api/exercises")
			.field("name", "Exercice Test")
			.field("description", "Un test")
			.field("duration", "10")
			.field("level", "Beginner")
			.field("adminId", adminId)
			.field("categoryIds", JSON.stringify([]))
			.attach("audio", audioPath)
			.attach("image", imagePath);

		expect(res.status).toBe(201);
		expect(res.body.description).toBe("Un test"); // Ensure the description matches the input
		expect(res.body.description).toBe("Un test");
		expect(res.body.audioUrl).toBeDefined();
		expect(res.body.imageUrl).toBeDefined();

		exerciseId = res.body.id; // Store the created exercise ID for later tests
	});

	it("should get all breathing exercises", async () => {
		// Ensure at least one exercise exists
		await prisma.breathingExercise.create({
			data: {
				name: "Pre-existing Exercise",
				description: "This is a pre-existing exercise",
				duration: 5,
				level: "Beginner",
				adminId: adminId,
				audioUrl: "http://example.com/audio.mp3",
				imageUrl: "http://example.com/image.jpg",
			},
		});

		const res = await request(app).get("/api/exercises");
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should get a breathing exercise by ID", async () => {
		const res = await request(app).get(`/api/exercises/${exerciseId}`);
		expect(res.status).toBe(200);
		expect(res.body.id).toBe(exerciseId);
		expect(res.body.name).toBe("Exercice Test");
	});

	it("should update a breathing exercise", async () => {
		const updatedName = "Exercice Test Updated";
		const res = await request(app)
			.put(`/api/exercises/${exerciseId}`)
			.field("name", updatedName)
			.field("description", "Updated description")
			.field("duration", "15")
			.field("level", "Intermediate")
			.field("adminId", adminId)
			.field("categoryIds", JSON.stringify([]))
			.field("audioUrl", "http://example.com/audio.mp3") // Ensure audioUrl is provided
			.field("imageUrl", "http://example.com/image.jpg") // Ensure imageUrl is provided
			.field("categoryIds", JSON.stringify([]));

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(updatedName);
		expect(res.body.description).toBe("Updated description");
		expect(res.body.duration).toBe(15);
		expect(res.body.level).toBe("Intermediate");
	});

	it("should delete a breathing exercise", async () => {
		const res = await request(app).delete(`/api/exercises/${exerciseId}`);
		expect(res.status).toBe(204);

		// Verify the exercise no longer exists
		const getRes = await request(app).get(`/api/exercises/${exerciseId}`);
		expect(getRes.status).toBe(404);
	});
});
