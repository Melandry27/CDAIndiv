import { ExerciseSessionService } from "../services/session.service";
const exerciseSessionService = new ExerciseSessionService();
export class ExerciseSessionController {
    async create(req, res) {
        const exerciseSession = await exerciseSessionService.createExerciseSession(req.body);
        res.status(201).json(exerciseSession);
    }
    async getAll(req, res) {
        const exerciseSessions = await exerciseSessionService.getAllExerciseSessions();
        res.json(exerciseSessions);
    }
    async getById(req, res) {
        const exerciseSession = await exerciseSessionService.getExerciseSessionById(req.params.id);
        if (!exerciseSession)
            return res.status(404).json({ message: "ExerciseSession not found" });
        res.json(exerciseSession);
    }
    async update(req, res) {
        const exerciseSession = await exerciseSessionService.updateExerciseSession(req.params.id, req.body);
        res.json(exerciseSession);
    }
    async delete(req, res) {
        await exerciseSessionService.deleteExerciseSession(req.params.id);
        res.status(204).send();
    }
}
