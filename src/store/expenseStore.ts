import { create } from 'zustand'
import type { Expense, ExpenseCategory } from '../types'
import * as expenseService from '../services/expenses'

interface Filters {
  category: ExpenseCategory | 'All'
  search: string
  month: string // format: 'YYYY-MM'
}

interface ExpenseStore {
  expenses: Expense[]
  isLoading: boolean
  error: string | null
  filters: Filters

  // Actions
  fetchExpenses: () => Promise<void>
  addExpense: (expense: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => Promise<void>
  updateExpense: (id: string, updates: Partial<Expense>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
  setFilter: (filters: Partial<Filters>) => void

  // Derived
  getFilteredExpenses: () => Expense[]
  getTotalSpend: () => number
}

export const useExpenseStore = create<ExpenseStore>()((set, get) => ({
  expenses: [],
  isLoading: false,
  error: null,
  filters: {
    category: 'All',
    search: '',
    month: new Date().toISOString().slice(0, 7) // current month
  },

  fetchExpenses: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await expenseService.getExpenses()
      set({ expenses: data, isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  addExpense: async (expense) => {
    set({ error: null })
    try {
      const newExpense = await expenseService.createExpense(expense)
      set({ expenses: [newExpense, ...get().expenses] })
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  updateExpense: async (id, updates) => {
    set({ error: null })
    try {
      const updated = await expenseService.updateExpense(id, updates)
      set({
        expenses: get().expenses.map(e => e.id === id ? updated : e)
      })
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  deleteExpense: async (id) => {
    set({ error: null })
    try {
      await expenseService.deleteExpense(id)
      set({ expenses: get().expenses.filter(e => e.id !== id) })
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  setFilter: (filters) => {
    set({ filters: { ...get().filters, ...filters } })
  },

  getFilteredExpenses: () => {
    const { expenses, filters } = get()
    return expenses.filter(e => {
      const matchCategory = filters.category === 'All' || e.category === filters.category
      const matchSearch = e.title.toLowerCase().includes(filters.search.toLowerCase())
      const matchMonth = e.date.startsWith(filters.month)
      return matchCategory && matchSearch && matchMonth
    })
  },

  getTotalSpend: () => {
    const { expenses, filters } = get()
    return expenses
      .filter(e => e.date.startsWith(filters.month))
      .reduce((sum, e) => sum + e.amount, 0)
  }
}))