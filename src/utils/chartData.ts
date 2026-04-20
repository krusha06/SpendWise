import type { Expense } from '../types'

export const getCategoryData = (expenses: Expense[]) => {
  const map: Record<string, number> = {}
  expenses.forEach(e => {
    map[e.category] = (map[e.category] ?? 0) + e.amount
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export const getMonthlyTrend = (expenses: Expense[]) => {
  const map: Record<string, number> = {}
  expenses.forEach(e => {
    const month = e.date.slice(0, 7) // YYYY-MM
    map[month] = (map[month] ?? 0) + e.amount
  })

  // Sort by month and return last 6 months
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, total]) => ({
      month: new Date(month + '-01').toLocaleString('default', { month: 'short' }),
      total
    }))
}

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`
}