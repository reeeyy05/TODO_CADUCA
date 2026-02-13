import type { RegisterData } from "./Profile";
import type { SessionUser } from "./SessionUser";

/**
 * Define las operaciones relacionadas con los usuarios de la aplicación.
 *
 * Esta interfaz abstrae el acceso a datos, permitiendo implementar distintos
 * métodos de persistencia sin acoplar la lógica a una tecnología concreta.
 */
export interface UserRepository {

  /**
   * Crea un nuevo usuario autenticado y su perfil asociado.
   * @param data - Datos del usuario a crear.
   */
  createUser(data: RegisterData): Promise<{ data?: SessionUser, error?: any }>;
  
}