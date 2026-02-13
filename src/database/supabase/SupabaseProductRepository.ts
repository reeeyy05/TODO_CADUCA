import type { Producto } from "../../interfaces/Producto";
import type { ProductRepository } from "../repositories/ProductRepository";
import { supabase } from "./Client";

export class SupabaseProductRepository implements ProductRepository {

  async createProduct(data: Partial<Producto>) {
    const { data: productData, error } = await supabase
      .from("Products")
      .insert({
        nombre: data.nombre,
        cantidad: data.cantidad,
        fecha_caducidad: data.fecha_caducidad,
        estado: data.estado,
        id_categoria: data.id_categoria,
        user_id: data.user_id,
        // created_at se puede omitir si la base de datos lo genera automáticamente
      })
      .select()
      .single();

    if (error) {
      console.error("Error createProduct:", error);
      return { error };
    }
    return { data: productData as Producto | undefined };
  }

  async getProducts() {
    const { data, error } = await supabase
      .from("Products")
      .select("*");
    if (error) {
      console.error("Error getProducts:", error);
      return { error };
    }
    return { data };
  }
}