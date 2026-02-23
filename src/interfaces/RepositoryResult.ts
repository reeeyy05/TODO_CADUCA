/**
 * Tipo unificado para errores de repositorio.
 * Permite representar errores tanto de Supabase como personalizados.
 */
export interface RepositoryError {
  message: string;
  code?: string;
}

/**
 * Resultado genérico de una operación de repositorio.
 * Si hubo error, `data` será `undefined` y `error` contendrá la información.
 */
export interface RepositoryResult<T> {
  data?: T;
  error?: RepositoryError;
}
