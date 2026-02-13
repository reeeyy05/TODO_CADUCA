import type { Producto } from "../../interfaces/Producto";

/**
 * Define las operaciones relacionadas con el catálogo de productos.
 */
export interface CatalogRepository {
  /**
   * Obtiene todos los productos del catálogo.
   */
  getCatalogProducts(): Promise<{ data?: Producto[]; error?: any }>;

  /**
   * Obtiene los productos del catálogo filtrados por categoría.
   * @param idCategoria - ID de la categoría.
   */
  getCatalogProductsByCategory(idCategoria: number): Promise<{ data?: Producto[]; error?: any }>;
}
