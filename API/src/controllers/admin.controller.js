import { AdminService } from "../services/admin.service";
const adminService = new AdminService();
export class AdminController {
    async create(req, res) {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    }
    async getAll(req, res) {
        const admins = await adminService.getAllAdmins();
        res.json(admins);
    }
    async getById(req, res) {
        const admin = await adminService.getAdminById(req.params.id);
        if (!admin)
            return res.status(404).json({ message: "Admin not found" });
        res.json(admin);
    }
    async update(req, res) {
        const admin = await adminService.updateAdmin(req.params.id, req.body);
        res.json(admin);
    }
    async delete(req, res) {
        await adminService.deleteAdmin(req.params.id);
        res.status(204).send();
    }
}
