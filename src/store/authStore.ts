import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SessionUser } from '../interfaces/SessionUser'

interface AuthState {
  sessionUser: SessionUser | null
  isAuthenticated: boolean

  setSession: (sessionUser: SessionUser) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(

  // persist es un middleware de persistencia que nos permitirá
  // guardar el storage en localStorage y permitir que si refrescamos
  // la pestaña con el login hecho, sigamos teniéndolo hasta cerrar sesión

  // persist requiere 2 parámetros, en el primero metemos la implementación
  // y en el segundo parámetros para decidir que persistir, nombres...
  persist((set) => ({
    sessionUser: null,
    isAuthenticated: false,
    setSession: (sessionUser) => set({ sessionUser, isAuthenticated: true }),
    clearSession: () => set({ sessionUser: null, isAuthenticated: false }),
  }),
  {
    name: 'auth-v1', // localStorage.getItem('auth-v1')
    version: 1,
    partialize: (state) => ({  // solo persistir lo esencial
      sessionUser: state.sessionUser,
      isAuthenticated: state.isAuthenticated,
    }),
  }
  )
)