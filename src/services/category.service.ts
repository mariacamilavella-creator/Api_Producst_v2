import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import { AppError } from "../errors/app-error";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    return this.categoryRepository.findAll();
  }

  async getById(id: number) {
    const category = this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError(404, "Categoría no encontrada");
    }

    return category;
  }

  async getByName(name: string) {
    const categories = this.categoryRepository.findByName(name);

    if (categories.length === 0) {
      throw new AppError(404, "No se encontraron categorías con ese nombre");
    }

    return categories;
  }

  async create(data: CreateCategoryDto) {
    const existing = this.categoryRepository.findByName(data.name);

    if (existing.some((c) => c.name.toLowerCase() === data.name.toLowerCase())) {
      throw new AppError(409, "Ya existe una categoría con ese nombre");
    }

    return this.categoryRepository.create(data);
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError(404, "Categoría no encontrada");
    }

    if (data.name) {
      const existing = this.categoryRepository.findByName(data.name);

      if (existing.some((candidate) => candidate.id !== id && candidate.name.toLowerCase() === data.name!.toLowerCase())) {
        throw new AppError(409, "Ya existe otra categoría con ese nombre");
      }
    }

    const updatedCategory = this.categoryRepository.update(id, data);

    if (!updatedCategory) {
      throw new AppError(404, "Categoría no encontrada");
    }

    return updatedCategory;
  }

  async delete(id: number) {
    const category = this.categoryRepository.findById(id);

    if (!category) {
      throw new AppError(404, "Categoría no encontrada");
    }

    this.categoryRepository.delete(id);
  }
}