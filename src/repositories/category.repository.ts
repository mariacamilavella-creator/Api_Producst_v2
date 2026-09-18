import { categories } from "../data/category.data";
import { Category } from "../models/category.model";
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from "../dtos/category.dto";

export class CategoryRepository {

  findAll(): Category[] {
    return categories;
  }

  findById(id: number): Category | undefined {
    return categories.find(category => category.id === id);
  }

  findByName(name: string): Category[] {
    return categories.filter(category => 
      category.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: categories.length + 1,
      ...createCategoryDto,
      active: createCategoryDto.active ?? true
    };
    categories.push(newCategory);
    return newCategory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Category | undefined {
    const index = categories.findIndex(category => category.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updateCategoryDto };
      return categories[index];
    }
    return undefined;
  }

  delete(id: number): boolean {
    const index = categories.findIndex(category => category.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
      return true;
    }
    return false;
  }
}