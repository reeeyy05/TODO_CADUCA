import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Perfil } from '../interfaces/Perfil'
import { supabase } from '../database/supabase/Client'
import { createUserRepository } from '../database/repositories'

interface AuthState {
  perfil: Perfil | null
  isAuthenticated: boolean
  loading: boolean

  setPerfil: (perfil: Perfil) => void
  clearSession: () => void
  logout: () => Promise<void>
  initSession: () => Promise<void>
  updateNombre: (nombre: string) => Promise<{ error?: string }>
  sendPasswordRecovery: () => Promise<{ error?: string }>
  uploadAvatar: (file: File) => Promise<{ error?: string }>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      perfil: null,
      isAuthenticated: false,
      loading: true,

      setPerfil: (perfil) => set({ perfil, isAuthenticated: true, loading: false }),

      clearSession: () => set({ perfil: null, isAuthenticated: false, loading: false }),

      logout: async () => {
        await supabase.auth.signOut()
        set({ perfil: null, isAuthenticated: false, loading: false })
      },

      initSession: async () => {
        set({ loading: true })
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user) {
          set({ perfil: null, isAuthenticated: false, loading: false })
          return
        }

        const { data: profile, error } = await supabase
          .from('perfiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (error || !profile) {
          set({ perfil: null, isAuthenticated: false, loading: false })
          return
        }

        set({ perfil: profile as Perfil, isAuthenticated: true, loading: false })
      },

      updateNombre: async (nombre: string) => {
        const perfil = get().perfil
        if (!perfil) return { error: 'No hay sesión activa' }

        const { error } = await supabase
          .from('perfiles')
          .update({ nombre_completo: nombre })
          .eq('user_id', perfil.user_id)

        if (error) return { error: error.message }

        set({ perfil: { ...perfil, nombre_completo: nombre } })
        return {}
      },

      sendPasswordRecovery: async () => {
        const perfil = get().perfil
        if (!perfil) return { error: 'No hay sesión activa' }

        const { error } = await supabase.auth.resetPasswordForEmail(perfil.email, {
          redirectTo: `${window.location.origin}/login`,
        })

        if (error) return { error: error.message }
        return {}
      },

      uploadAvatar: async (file: File) => {
        const perfil = get().perfil
        if (!perfil) return { error: 'No hay sesión activa' }

        const repo = createUserRepository()
        const { data: avatarUrl, error } = await repo.uploadAvatar(perfil.user_id, file)

        if (error) return { error: error.message }

        set({ perfil: { ...perfil, avatar_url: avatarUrl! } })
        return {}
      },
    }),
    {
      name: 'auth-v1',
      version: 1,
      partialize: (state) => ({
        perfil: state.perfil,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)