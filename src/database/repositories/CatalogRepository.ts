import type { Producto } from "@/interfaces/Producto";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";

/**
 * Define las operaciones relacionadas con el catálogo de productos.
 */
export interface CatalogRepository {
  getCatalogProducts(): Promise<RepositoryResult<Producto[]>>;
  getCatalogProductsByCategory(idCategoria: number): Promise<RepositoryResult<Producto[]>>;
  findProduct(nombre: string, idCategoria: number): Promise<RepositoryResult<Producto | null>>;
  createProduct(nombre: string, idCategoria: number): Promise<RepositoryResult<Producto>>;
}
