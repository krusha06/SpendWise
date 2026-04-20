import { getCategoryData, getMonthlyTrend, formatCurrency } from '../chartData'
import type { Expense } from '../../types'

const mockExpenses: Expense[] = [
  {
    id: '1', user_id: 'u1', title: 'Lunch',
    amount: 200, category: 'Food',
    date: '2026-04-01', created_at: ''
  },
  {
    id: '2', user_id: 'u1', title: 'Bus',
    amount: 50, category: 'Transport',
    date: '2026-04-05', created_at: ''
  },
  {
    id: '3', user_id: 'u1', title: 'Dinner',
    amount: 300, category: 'Food',
    date: '2026-03-20', created_at: ''
  }
]

describe('formatCurrency', () => {
  it('formats number with rupee symbol', () => {
    expect(formatCurrency(1000)).toBe('₹1,000')
  })

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('₹0')
  })

  it('formats large numbers correctly', () => {
    expect(formatCurrency(100000)).toBe('₹1,00,000')
  })
})

describe('getCategoryData', () => {
  it('groups expenses by category', () => {
    const data = getCategoryData(mockExpenses)
    const food = data.find(d => d.name === 'Food')
    const transport = data.find(d => d.name === 'Transport')
    expect(food?.value).toBe(500) // 200 + 300
    expect(transport?.value).toBe(50)
  })

  it('returns empty array for no expenses', () => {
    expect(getCategoryData([])).toEqual([])
  })
})

describe('getMonthlyTrend', () => {
  it('groups expenses by month', () => {
    const data = getMonthlyTrend(mockExpenses)
    expect(data.length).toBeGreaterThan(0)
  })

  it('returns max 6 months', () => {
    const data = getMonthlyTrend(mockExpenses)
    expect(data.length).toBeLessThanOrEqual(6)
  })
})