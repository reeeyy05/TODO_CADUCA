import type { UsuarioProducto } from "../../interfaces/UsuarioProducto";
import type { ProductRepository } from "../repositories/ProductRepository";
import { supabase } from "./Client";

export class SupabaseProductRepository implements ProductRepository {

  async createUserProduct(data: {
    id_perfil: number;
    id_producto: number;
    cantidad: number;
    fecha_caducidad: string;
  }): Promise<{ data?: UsuarioProducto; error?: any }> {
    const { data: productData, error } = await supabase
      .from('usuario_productos')
      .insert({
        id_perfil: data.id_perfil,
        id_producto: data.id_producto,
        cantidad: data.cantidad,
        fecha_caducidad: data.fecha_caducidad,
        estado: 'pendiente',
      })
      .select(`
        *,
        producto:productos (
          nombre,
          id_categoria,
          categoria:categorias (
            nombre
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error createUserProduct:', error);
      return { error };
    }

    return { data: productData as UsuarioProducto };
  }

  async getUserProducts(): Promise<{ data?: UsuarioProducto[]; error?: any }> {
    const { data, error } = await supabase
      .from('usuario_productos')
      .select(`
        *,
        producto:productos (
          nombre,
          id_categoria,
          categoria:categorias (
            nombre
          )
        )
      `)
      .order('fecha_caducidad', { ascending: true });

    if (error) {
      console.error('Error getUserProducts:', error);
      return { error };
    }

    return { data: data as UsuarioProducto[] };
  }

  async updateUserProduct(
    id: number,
    data: Partial<Pick<UsuarioProducto, 'cantidad' | 'fecha_caducidad' | 'estado'>>
  ): Promise<{ data?: UsuarioProducto; error?: any }> {
    const { data: updated, error } = await supabase
      .from('usuario_productos')
      .update(data)
      .eq('id_usuario_producto', id)
      .select(`
        *,
        producto:productos (
          nombre,
          id_categoria,
          categoria:categorias (
            nombre
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error updateUserProduct:', error);
      return { error };
    }

    return { data: updated as UsuarioProducto };
  }

  async deleteUserProduct(id: number): Promise<{ error?: any }> {
    const { error } = await supabase
      .from('usuario_productos')
      .delete()
      .eq('id_usuario_producto', id);

    if (error) {
      console.error('Error deleteUserProduct:', error);
    }

    return { error: error || null };
  }
}