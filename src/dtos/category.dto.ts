export interface CreateCategoryDto {
  name: string;
  description?: string;
  active?: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  active?: boolean;
}