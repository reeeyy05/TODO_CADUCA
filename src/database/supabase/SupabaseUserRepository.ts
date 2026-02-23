import type { RegisterData, Perfil } from "@/interfaces/Perfil";
import type { SessionUser } from "@/interfaces/SessionUser";
import type { RepositoryResult } from "@/interfaces/RepositoryResult";
import type { UserRepository } from "../repositories/UserRepository";
import { supabase } from "./Client";

export class SupabaseUserRepository implements UserRepository {

  async createUser(data: RegisterData): Promise<RepositoryResult<SessionUser>> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { nombre_completo: data.nombre_completo || '' },
      },
    });

    if (authError) {
      return { error: { message: authError.message, code: authError.code } };
    }

    if (!authData.user) {
      return { error: { message: 'No se recibió usuario después del registro' } };
    }

    // Si hay sesión activa (confirmación de email desactivada),
    // leemos el perfil que el trigger ya creó.
    if (authData.session) {
      const { data: profile, error: profileError } = await supabase
        .from('perfiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (profileError) {
        return { error: { message: profileError.message, code: profileError.code } };
      }

      return { data: { user: authData.user, profile } };
    }

    // Sin sesión = confirmación de email pendiente
    return {
      data: {
        user: authData.user,
        profile: null as unknown as Perfil,
      },
    };
  }

  async login(email: string, password: string): Promise<RepositoryResult<SessionUser>> {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { error: { message: authError.message, code: authError.code } };
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
      return { error: { message: profileError.message, code: profileError.code } };
    }

    return { data: { user: authData.user, profile } };
  }

  async resetPasswordForEmail(email: string): Promise<RepositoryResult<void>> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) return { error: { message: error.message, code: error.code } };
    return {};
  }

  async logout(): Promise<RepositoryResult<void>> {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: { message: error.message, code: error.code } };
    return {};
  }

  async getCurrentProfile(): Promise<RepositoryResult<Perfil>> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: { message: authError?.message ?? 'No hay usuario autenticado' } };
    }

    const { data: profile, error: profileError } = await supabase
      .from('perfiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      return { error: { message: profileError.message, code: profileError.code } };
    }

    return { data: profile };
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('check_email_exists', { p_email: email });
    if (error) {
      console.error("Error comprobando email:", error);
      return false;
    }
    return data === true;
  }
}