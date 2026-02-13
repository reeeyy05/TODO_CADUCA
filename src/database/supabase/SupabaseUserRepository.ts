import type { RegisterData, Perfil } from "../../interfaces/Perfil";
import type { SessionUser } from "../../interfaces/SessionUser";
import type { UserRepository } from "../repositories/UserRepository";
import { supabase } from "./Client";

export class SupabaseUserRepository implements UserRepository {

  async createUser(data: RegisterData): Promise<{ data?: SessionUser; error?: any }> {
    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      return { error: authError };
    }

    if (!authData.user) {
      return { error: { message: 'No se recibió usuario después del registro' } };
    }

    // 2. Crear perfil en la tabla perfiles
    const { data: profile, error: profileError } = await supabase
      .from('perfiles')
      .insert({
        user_id: authData.user.id,
        nombre_completo: data.nombre_completo || null,
        email: data.email,
      })
      .select()
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
      redirectTo: "https://.../reset-password",
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
}