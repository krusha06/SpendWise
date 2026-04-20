import { create } from 'zustand'
import { supabase } from '../services/supabase'
import type { AuthUser } from '../types'

interface AuthStore {
  user: AuthUser | null
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  initialize: () => void
}

const mapUser = (user: any): AuthUser => ({
  id: user.id,
  email: user.email!,
  full_name: user.user_metadata?.full_name ?? ''
})

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        user: session?.user ? mapUser(session.user) : null,
        isLoading: false
      })
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        user: session?.user ? mapUser(session.user) : null,
        isLoading: false
      })
    })
  }
}))