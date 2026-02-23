import type { Categoria } from "@/interfaces/Categoria";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";

/**
 * Define las operaciones relacionadas con las categorías.
 */
export interface CategoryRepository {
  getCategories(): Promise<RepositoryResult<Categoria[]>>;
}
