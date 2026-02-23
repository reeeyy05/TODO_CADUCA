import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Perfil } from '@/interfaces/Perfil'
import { createUserRepository } from '@/database/repositories'

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
}

const userRepository = createUserRepository()

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      perfil: null,
      isAuthenticated: false,
      loading: true,

      setPerfil: (perfil) => set({ perfil, isAuthenticated: true, loading: false }),

      clearSession: () => set({ perfil: null, isAuthenticated: false, loading: false }),

      logout: async () => {
        await userRepository.logout()
        set({ perfil: null, isAuthenticated: false, loading: false })
      },

      initSession: async () => {
        set({ loading: true })
        const { data, error } = await userRepository.getCurrentProfile()

        if (error || !data) {
          set({ perfil: null, isAuthenticated: false, loading: false })
          return
        }

        set({ perfil: data, isAuthenticated: true, loading: false })
      },

      updateNombre: async (nombre: string) => {
        const perfil = get().perfil
        if (!perfil) return { error: 'No hay sesión activa' }

        // Para updateNombre seguimos usando supabase directamente por ahora,
        // ya que no hay un método dedicado en el repositorio.
        // TODO: Añadir updateProfile al UserRepository
        const { supabase } = await import('@/database/supabase/Client')
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

        const { error } = await userRepository.resetPasswordForEmail(perfil.email)
        if (error) return { error: error.message }
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