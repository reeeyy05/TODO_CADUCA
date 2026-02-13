import { SupabaseProductRepository } from "../supabase/SupabaseProductRepository";
import { SupabaseUserRepository } from "../supabase/SupabaseUserRepository";
import { SupabaseCategoryRepository } from "../supabase/SupabaseCategoryRepository";
import { SupabaseCatalogRepository } from "../supabase/SupabaseCatalogRepository";
import type { ProductRepository } from "./ProductRepository";
import type { UserRepository } from "./UserRepository";
import type { CategoryRepository } from "./CategoryRepository";
import type { CatalogRepository } from "./CatalogRepository";

/**
 * Fábrica de repositorios
 *
 * Estas funciones crean una instancia de un repositorio concreto que se utilizará
 * en la aplicación para gestionar las llamadas a sus tablas.
 *
 * El objetivo de este patrón es abstraer la implementación real (en este caso,
 * Supabase) del resto del código, de modo que si en el futuro se cambia la
 * fuente de datos, no sea necesario modificar el resto de la aplicación.
 */
export const createProductRepository = (): ProductRepository => {
  return new SupabaseProductRepository();
};

export const createUserRepository = (): UserRepository => {
  return new SupabaseUserRepository();
};

export const createCategoryRepository = (): CategoryRepository => {
  return new SupabaseCategoryRepository();
};

export const createCatalogRepository = (): CatalogRepository => {
  return new SupabaseCatalogRepository();
};