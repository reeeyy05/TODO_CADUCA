import type { Categoria } from "../../interfaces/Categoria";

/**
 * Define las operaciones relacionadas con las categorías.
 */
export interface CategoryRepository {
  /**
   * Obtiene todas las categorías disponibles.
   */
  getCategories(): Promise<{ data?: Categoria[]; error?: any }>;
}
