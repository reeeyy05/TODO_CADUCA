import type { UsuarioProducto } from "@/interfaces/UsuarioProducto";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";

/**
 * Define las operaciones relacionadas con los productos del usuario.
 */
export interface ProductRepository {
  createUserProduct(data: {
    id_perfil: number;
    id_producto: number;
    cantidad: number;
    fecha_caducidad: string;
  }): Promise<RepositoryResult<UsuarioProducto>>;

  getUserProducts(): Promise<RepositoryResult<UsuarioProducto[]>>;

  updateUserProduct(
    id: number,
    data: Partial<Pick<UsuarioProducto, 'cantidad' | 'fecha_caducidad' | 'estado'>>
  ): Promise<RepositoryResult<UsuarioProducto>>;

  deleteUserProduct(id: number): Promise<RepositoryResult<void>>;
}