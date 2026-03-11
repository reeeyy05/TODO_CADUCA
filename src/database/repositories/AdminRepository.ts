import type { Perfil } from '../../interfaces/Perfil';

export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  expiredProducts: number;
  activeProducts: number;
}

export interface UserWithStats extends Perfil {
  total_productos: number;
  productos_caducados: number;
}

export interface AdminRepository {
  /** Obtiene todos los perfiles de usuarios */
  getAllUsers(): Promise<{ data: Perfil[] | null; error: { message: string } | null }>;

  /** Obtiene estadísticas globales de la aplicación */
  getGlobalStats(): Promise<{ data: AdminStats | null; error: { message: string } | null }>;

  /** Obtiene usuarios con sus estadísticas de productos */
  getUsersWithStats(): Promise<{ data: UserWithStats[] | null; error: { message: string } | null }>;

  /** Elimina un usuario por su user_id (y su perfil asociado) */
  deleteUser(userId: string): Promise<{ error: { message: string } | null }>;

  /** Actualiza el nombre de un usuario */
  updateUserName(userId: string, newName: string): Promise<{ error: { message: string } | null }>;
}
