import type { UsuarioProducto } from "../../interfaces/UsuarioProducto";

/**
 * Define las operaciones relacionadas con los productos del usuario.
 */
export interface ProductRepository {
  /**
   * Añade un producto al inventario del usuario.
   * @param data - Datos del producto a añadir.
   */
  createUserProduct(data: {
    id_perfil: number;
    id_producto: number;
    cantidad: number;
    fecha_caducidad: string;
  }): Promise<{ data?: UsuarioProducto; error?: any }>;

  /**
   * Obtiene todos los productos del usuario autenticado.
   */
  getUserProducts(): Promise<{ data?: UsuarioProducto[]; error?: any }>;

  /**
   * Actualiza un producto del usuario (ej: cambiar estado o cantidad).
   * @param id - ID del registro en usuario_productos.
   * @param data - Campos a actualizar.
   */
  updateUserProduct(
    id: number,
    data: Partial<Pick<UsuarioProducto, 'cantidad' | 'fecha_caducidad' | 'estado'>>
  ): Promise<{ data?: UsuarioProducto; error?: any }>;

  /**
   * Elimina un producto del inventario del usuario.
   * @param id - ID del registro en usuario_productos.
   */
  deleteUserProduct(id: number): Promise<{ error?: any }>;
}