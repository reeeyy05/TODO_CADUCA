import { supabase } from './Client';
import type { AdminRepository, AdminStats, UserWithStats } from '../repositories/AdminRepository';
import type { Perfil } from '../../interfaces/Perfil';

export class SupabaseAdminRepository implements AdminRepository {

  async getAllUsers(): Promise<{ data: Perfil[] | null; error: { message: string } | null }> {
    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .order('fecha_registro', { ascending: false });

    if (error) return { data: null, error: { message: error.message } };
    return { data: data as Perfil[], error: null };
  }

  async getGlobalStats(): Promise<{ data: AdminStats | null; error: { message: string } | null }> {
    try {
      // Total de usuarios
      const { count: totalUsers, error: usersError } = await supabase
        .from('perfiles')
        .select('*', { count: 'exact', head: true });

      if (usersError) return { data: null, error: { message: usersError.message } };

      // Total de productos en inventario
      const { count: totalProducts, error: productsError } = await supabase
        .from('usuario_productos')
        .select('*', { count: 'exact', head: true });

      if (productsError) return { data: null, error: { message: productsError.message } };

      // Productos caducados (fecha_caducidad < hoy)
      const today = new Date().toISOString().split('T')[0];

      const { count: expiredProducts, error: expiredError } = await supabase
        .from('usuario_productos')
        .select('*', { count: 'exact', head: true })
        .lt('fecha_caducidad', today);

      if (expiredError) return { data: null, error: { message: expiredError.message } };

      const stats: AdminStats = {
        totalUsers: totalUsers ?? 0,
        totalProducts: totalProducts ?? 0,
        expiredProducts: expiredProducts ?? 0,
        activeProducts: (totalProducts ?? 0) - (expiredProducts ?? 0),
      };

      return { data: stats, error: null };
    } catch (err) {
      return { data: null, error: { message: (err as Error).message } };
    }
  }

  async getUsersWithStats(): Promise<{ data: UserWithStats[] | null; error: { message: string } | null }> {
    // Traemos todos los perfiles
    const { data: users, error: usersError } = await supabase
      .from('perfiles')
      .select('*')
      .order('fecha_registro', { ascending: false });

    if (usersError) return { data: null, error: { message: usersError.message } };
    if (!users) return { data: [], error: null };

    const today = new Date().toISOString().split('T')[0];

    // Para cada usuario, obtenemos conteos de sus productos
    const usersWithStats: UserWithStats[] = await Promise.all(
      users.map(async (user) => {
        const { count: total } = await supabase
          .from('usuario_productos')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.user_id);

        const { count: expired } = await supabase
          .from('usuario_productos')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.user_id)
          .lt('fecha_caducidad', today);

        return {
          ...user,
          total_productos: total ?? 0,
          productos_caducados: expired ?? 0,
        } as UserWithStats;
      })
    );

    return { data: usersWithStats, error: null };
  }

  async deleteUser(userId: string): Promise<{ error: { message: string } | null }> {
    // Primero eliminamos los productos del usuario
    const { error: prodError } = await supabase
      .from('usuario_productos')
      .delete()
      .eq('user_id', userId);

    if (prodError) return { error: { message: prodError.message } };

    // Luego eliminamos el perfil
    const { error: profileError } = await supabase
      .from('perfiles')
      .delete()
      .eq('user_id', userId);

    if (profileError) return { error: { message: profileError.message } };

    return { error: null };
  }

  async updateUserName(userId: string, newName: string): Promise<{ error: { message: string } | null }> {
    const { error } = await supabase
      .from('perfiles')
      .update({ nombre_completo: newName })
      .eq('user_id', userId);

    if (error) return { error: { message: error.message } };
    return { error: null };
  }
}
