import { HistoryService } from "../services/history.service";
const historyService = new HistoryService();
export class HistoryController {
    async create(req, res) {
        const history = await historyService.createHistory(req.body);
        res.status(201).json(history);
    }
    async getAll(req, res) {
        const histories = await historyService.getAllHistories();
        res.json(histories);
    }
    async getById(req, res) {
        const history = await historyService.getHistoryById(req.params.id);
        if (!history)
            return res.status(404).json({ message: "History not found" });
        res.json(history);
    }
    async update(req, res) {
        const history = await historyService.updateHistory(req.params.id, req.body);
        res.json(history);
    }
    async delete(req, res) {
        await historyService.deleteHistory(req.params.id);
        res.status(204).send();
    }
}
