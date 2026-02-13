import type { Producto } from "../../interfaces/Producto";

export interface ProductRepository {

  /**
   * Crea un nuevo producto en el sistema.
   * @param data - Datos parciales del producto a crear.
   * @returns Un objeto con el producto creado o un error en caso de fallo.
   */
  createProduct(data: Partial<Producto>): Promise<{ data?: Producto, error?: any }>;

  /**
   * Obtiene todos los productos del sistema.
   * @returns Un objeto con la lista de productos o un error en caso de fallo.
   */
  getProducts(): Promise<{ data?: Producto[], error?: any }>;
}