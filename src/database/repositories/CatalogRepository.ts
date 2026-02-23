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

  /**
   * Busca un producto por nombre y categoría.
   * Devuelve el producto si existe, o null si no.
   */
  findProduct(nombre: string, idCategoria: number): Promise<{ data?: Producto | null; error?: any }>;

  /**
   * Crea un nuevo producto en el catálogo.
   */
  createProduct(nombre: string, idCategoria: number): Promise<{ data?: Producto; error?: any }>;
}
