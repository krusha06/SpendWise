import { create } from 'zustand'
import { getBudget, updateBudget } from '../services/budget'

interface BudgetStore {
  monthlyBudget: number
  isLoading: boolean
  fetchBudget: () => Promise<void>
  saveBudget: (amount: number) => Promise<void>
}

export const useBudgetStore = create<BudgetStore>()((set) => ({
  monthlyBudget: 0,
  isLoading: false,

  fetchBudget: async () => {
    set({ isLoading: true })
    try {
      const budget = await getBudget()
      set({ monthlyBudget: budget, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },

  saveBudget: async (amount) => {
    await updateBudget(amount)
    set({ monthlyBudget: amount })
  }
}))