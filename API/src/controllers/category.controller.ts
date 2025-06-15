import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response): Promise<any> {
    const { name, icon } = req.body;

    if (!name || !icon)
      return res.status(400).json({ message: "Name and icon are required" });

    const category = await categoryService.createCategory(name, icon);
    res.status(201).json(category);
  }

  async getAll(_req: Request, res: Response) {
    const categories = await categoryService.getAllCategories();

    res.json(categories);
  }

  async getById(req: Request, res: Response): Promise<any> {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  }

  async update(req: Request, res: Response): Promise<any> {
    const { name } = req.body;
    const updated = await categoryService.updateCategory(req.params.id, name);
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<any> {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.status(204).send();
  }
}
