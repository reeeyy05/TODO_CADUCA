import type { RegisterData } from "../../interfaces/Profile";
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

    // 2. Crear perfil en la tabla profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        username: data.username,
        avatar_url: data.avatar_url || '',
        role: data.role || 'user',
      })
      .select()
      .single();

    if (profileError) {
      return { error: profileError };
    }

    const sessionUser: SessionUser = {
      user: authData.user,
      profile: profile,
    };

    return { data: sessionUser };
  }

  async login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      return { error: authError };
    }

    if (!authData.user) {
      return { error: { message: 'No se recibió usuario después del login' } };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      // Cerrar sesión si no se encuentra el perfil
      await supabase.auth.signOut();
      return { error: profileError };
    }

    const sessionUser: SessionUser = {
      user: authData.user,
      profile: profile
    };

    return { data: sessionUser };
  }

  async resetPasswordForEmail(email: string): Promise<{ error?: any }> {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email, {
      redirectTo: "https://.../reset-password"
    });
    return { error: error || null };
  }
}