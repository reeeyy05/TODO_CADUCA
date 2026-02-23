import type { RegisterData, Perfil } from "@/interfaces/Perfil";
import type { SessionUser } from "@/interfaces/SessionUser";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";

/**
 * Define las operaciones relacionadas con los usuarios de la aplicación.
 */
export interface UserRepository {
  createUser(data: RegisterData): Promise<RepositoryResult<SessionUser>>;
  login(email: string, password: string): Promise<RepositoryResult<SessionUser>>;
  resetPasswordForEmail(email: string): Promise<RepositoryResult<void>>;
  logout(): Promise<RepositoryResult<void>>;
  getCurrentProfile(): Promise<RepositoryResult<Perfil>>;
  isEmailTaken(email: string): Promise<boolean>;
}