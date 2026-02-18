import type { Categoria } from "../../interfaces/Categoria";
import type { CategoryRepository } from "../repositories/CategoryRepository";
import { supabase } from "./Client";

export class SupabaseCategoryRepository implements CategoryRepository {

  async getCategories(): Promise<{ data?: Categoria[]; error?: any }> {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error getCategories:', error);
      return { error };
    }

    return { data: data as Categoria[] };
  }
}
