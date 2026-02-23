import type { Producto } from "@/interfaces/Producto";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";
import type { CatalogRepository } from "../repositories/CatalogRepository";
import { supabase } from "./Client";

export class SupabaseCatalogRepository implements CatalogRepository {

  async getCatalogProducts(): Promise<RepositoryResult<Producto[]>> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as Producto[] };
  }

  async getCatalogProductsByCategory(idCategoria: number): Promise<RepositoryResult<Producto[]>> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id_categoria', idCategoria)
      .order('nombre', { ascending: true });

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as Producto[] };
  }

  async findProduct(nombre: string, idCategoria: number): Promise<RepositoryResult<Producto | null>> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('nombre', nombre)
      .eq('id_categoria', idCategoria)
      .maybeSingle();

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as Producto | null };
  }

  async createProduct(nombre: string, idCategoria: number): Promise<RepositoryResult<Producto>> {
    const { data, error } = await supabase
      .from('productos')
      .insert({ nombre, id_categoria: idCategoria })
      .select('*')
      .single();

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as Producto };
  }
}
