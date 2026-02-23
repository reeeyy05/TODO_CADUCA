import type { Categoria } from "@/interfaces/Categoria";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";
import type { CategoryRepository } from "../repositories/CategoryRepository";
import { supabase } from "./Client";

export class SupabaseCategoryRepository implements CategoryRepository {

  async getCategories(): Promise<RepositoryResult<Categoria[]>> {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre', { ascending: true });

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as Categoria[] };
  }
}
