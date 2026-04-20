import { supabase } from './supabase'

export const getBudget = async (): Promise<number> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .select('monthly_budget')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data?.monthly_budget ?? 0
}

export const updateBudget = async (amount: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({ monthly_budget: amount })
    .eq('id', user.id)

  if (error) throw error
}