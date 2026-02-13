import type { RegisterData, Perfil } from "../../interfaces/Perfil";
import type { SessionUser } from "../../interfaces/SessionUser";

/**
 * Define las operaciones relacionadas con los usuarios de la aplicación.
 */
export interface UserRepository {
  /**
   * Crea un nuevo usuario autenticado y su perfil asociado.
   * @param data - Datos del usuario a crear.
   */
  createUser(data: RegisterData): Promise<{ data?: SessionUser; error?: any }>;

  /**
   * Inicia sesión de un usuario existente.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   */
  login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }>;

  /**
   * Envía un correo para restablecer la contraseña del usuario.
   * @param email - Correo electrónico del usuario.
   */
  resetPasswordForEmail(email: string): Promise<{ error?: any }>;

  /**
   * Cierra la sesión del usuario actual.
   */
  logout(): Promise<{ error?: any }>;

  /**
   * Obtiene el perfil del usuario autenticado actual.
   */
  getCurrentProfile(): Promise<{ data?: Perfil; error?: any }>;
}