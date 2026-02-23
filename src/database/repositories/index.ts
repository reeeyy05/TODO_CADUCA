import { SupabaseProductRepository } from "../supabase/SupabaseProductRepository";
import { SupabaseUserRepository } from "../supabase/SupabaseUserRepository";
import { SupabaseCategoryRepository } from "../supabase/SupabaseCategoryRepository";
import { SupabaseCatalogRepository } from "../supabase/SupabaseCatalogRepository";
import type { ProductRepository } from "./ProductRepository";
import type { UserRepository } from "./UserRepository";
import type { CategoryRepository } from "./CategoryRepository";
import type { CatalogRepository } from "./CatalogRepository";

/**
 * Fábrica de repositorios.
 *
 * Abstrae la implementación concreta (Supabase) del resto de la aplicación.
 * Si en el futuro se cambia la fuente de datos, solo hay que modificar estas funciones.
 */

export const createProductRepository = (): ProductRepository =>
  new SupabaseProductRepository();

export const createUserRepository = (): UserRepository =>
  new SupabaseUserRepository();

export const createCategoryRepository = (): CategoryRepository =>
  new SupabaseCategoryRepository();

export const createCatalogRepository = (): CatalogRepository =>
  new SupabaseCatalogRepository();