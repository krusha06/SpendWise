import { supabase } from './supabase'
import type { Expense } from '../types'

export const getExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export const createExpense = async (
  expense: Omit<Expense, 'id' | 'user_id' | 'created_at'>
): Promise<Expense> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('expenses')
    .insert({ ...expense, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateExpense = async (
  id: string,
  updates: Partial<Omit<Expense, 'id' | 'user_id' | 'created_at'>>
): Promise<Expense> => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteExpense = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)

  if (error) throw error
}