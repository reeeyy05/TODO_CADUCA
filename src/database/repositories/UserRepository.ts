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

  /**
   * Obtiene el rol de un usuario dado su ID.
   * @param userId - ID del usuario para el cual se desea obtener el rol.
   * @returns Un objeto con el rol del usuario o un error si ocurre algún problema.
   */
  fetchRole(userId: string): Promise<{ data?: string | null; error?: any }>;

  /**
   * Sube un avatar para el usuario y actualiza su perfil.
   * @param userId - ID del usuario.
   * @param file - Archivo de imagen a subir.
   * @returns La URL pública del avatar o un error.
   */
  uploadAvatar(userId: string, file: File): Promise<{ data?: string; error?: any }>;
}