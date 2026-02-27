import type { RegisterData, Perfil } from "../../interfaces/Perfil";
import type { SessionUser } from "../../interfaces/SessionUser";
import type { UserRepository } from "../repositories/UserRepository";
import { supabase } from "./Client";

export class SupabaseUserRepository implements UserRepository {

  async createUser(data: RegisterData): Promise<{ data?: SessionUser; error?: any }> {
    // 1. Crear usuario en Supabase Auth.
    //    Pasamos nombre_completo como metadata para que el trigger
    //    en la BD pueda crear el perfil automáticamente.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nombre_completo: data.nombre_completo || '',
        },
      },
    });

    if (authError) {
      console.error("Error en Supabase Auth:", authError);
      return { error: authError };
    }

    if (!authData.user) {
      return { error: { message: 'No se recibió usuario después del registro' } };
    }

    // 2. Si hay sesión activa (confirmación de email desactivada),
    //    leemos el perfil que el trigger ya creó.
    if (authData.session) {
      const { data: profile, error: profileError } = await supabase
        .from('perfiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError) {
        return { error: profileError };
      }

      return {
        data: {
          user: authData.user,
          profile: profile,
        },
      };
    }

    // 3. Sin sesión = confirmación de email pendiente.
    //    El trigger ya insertó el perfil en la BD.
    //    Devolvemos el usuario sin perfil (se obtendrá al hacer login).
    return {
      data: {
        user: authData.user,
        profile: null as unknown as Perfil,
      },
    };
  }

  async login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { error: authError };
    }

    if (!authData.user) {
      return { error: { message: 'No se recibió usuario después del login' } };
    }

    const { data: profile, error: profileError } = await supabase
      .from('perfiles')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (profileError) {
      await supabase.auth.signOut();
      return { error: profileError };
    }

    return {
      data: {
        user: authData.user,
        profile: profile,
      },
    };
  }

  async resetPasswordForEmail(email: string): Promise<{ error?: any }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    return { error: error || null };
  }

  async logout(): Promise<{ error?: any }> {
    const { error } = await supabase.auth.signOut();
    return { error: error || null };
  }

  async getCurrentProfile(): Promise<{ data?: Perfil; error?: any }> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: authError || { message: 'No hay usuario autenticado' } };
    }

    const { data: profile, error: profileError } = await supabase
      .from('perfiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      return { error: profileError };
    }

    return { data: profile };
  }

  async fetchRole(userId: string): Promise<{ data?: string | null; error?: any }> {
    const { data, error } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('user_id', userId)
      .single();

    if (error) return { error };
    return { data: data?.rol ?? null };
  }

  async uploadAvatar(userId: string, file: File): Promise<{ data?: string; error?: any }> {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    // Subir imagen al bucket "avatars"
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) return { error: uploadError };

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // Actualizar la columna avatar_url en perfiles
    const { error: updateError } = await supabase
      .from('perfiles')
      .update({ avatar_url: publicUrl })
      .eq('user_id', userId);

    if (updateError) return { error: updateError };

    return { data: publicUrl };
  }
}