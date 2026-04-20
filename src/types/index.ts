export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Health'
  | 'Other'

export interface Expense {
  id: string
  user_id: string
  title: string
  amount: number
  category: ExpenseCategory
  date: string
  created_at: string
}

export interface Profile {
  id: string
  full_name: string
  created_at: string
}

export interface Budget {
  monthly_limit: number
  current_spend: number
}

export interface AuthUser {
  id: string
  email: string
  full_name: string
}