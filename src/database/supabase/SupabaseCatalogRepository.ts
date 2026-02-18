import type { Producto } from "../../interfaces/Producto";
import type { CatalogRepository } from "../repositories/CatalogRepository";
import { supabase } from "./Client";

export class SupabaseCatalogRepository implements CatalogRepository {

  async getCatalogProducts(): Promise<{ data?: Producto[]; error?: any }> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error getCatalogProducts:', error);
      return { error };
    }

    return { data: data as Producto[] };
  }

  async getCatalogProductsByCategory(idCategoria: number): Promise<{ data?: Producto[]; error?: any }> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id_categoria', idCategoria)
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error getCatalogProductsByCategory:', error);
      return { error };
    }

    return { data: data as Producto[] };
  }
}
