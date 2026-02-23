import type { UsuarioProducto } from "@/interfaces/UsuarioProducto";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";
import type { ProductRepository } from "../repositories/ProductRepository";
import { supabase } from "./Client";

const PRODUCT_SELECT = `
  *,
  producto:productos (
    nombre,
    id_categoria,
    categoria:categorias (
      nombre
    )
  )
`;

export class SupabaseProductRepository implements ProductRepository {

  async createUserProduct(data: {
    id_perfil: number;
    id_producto: number;
    cantidad: number;
    fecha_caducidad: string;
  }): Promise<RepositoryResult<UsuarioProducto>> {
    const { data: productData, error } = await supabase
      .from('usuario_productos')
      .insert({
        id_perfil: data.id_perfil,
        id_producto: data.id_producto,
        cantidad: data.cantidad,
        fecha_caducidad: data.fecha_caducidad,
        estado: 'pendiente',
      })
      .select(PRODUCT_SELECT)
      .single();

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: productData as UsuarioProducto };
  }

  async getUserProducts(): Promise<RepositoryResult<UsuarioProducto[]>> {
    const { data, error } = await supabase
      .from('usuario_productos')
      .select(PRODUCT_SELECT)
      .order('fecha_caducidad', { ascending: true });

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: data as UsuarioProducto[] };
  }

  async updateUserProduct(
    id: number,
    data: Partial<Pick<UsuarioProducto, 'cantidad' | 'fecha_caducidad' | 'estado'>>
  ): Promise<RepositoryResult<UsuarioProducto>> {
    const { data: updated, error } = await supabase
      .from('usuario_productos')
      .update(data)
      .eq('id_usuario_producto', id)
      .select(PRODUCT_SELECT)
      .single();

    if (error) return { error: { message: error.message, code: error.code } };
    return { data: updated as UsuarioProducto };
  }

  async deleteUserProduct(id: number): Promise<RepositoryResult<void>> {
    const { error } = await supabase
      .from('usuario_productos')
      .delete()
      .eq('id_usuario_producto', id);

    if (error) return { error: { message: error.message, code: error.code } };
    return {};
  }
}