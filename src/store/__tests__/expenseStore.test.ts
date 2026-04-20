import { useExpenseStore } from '../expenseStore'

// Mock supabase
jest.mock('../../services/expenses', () => ({
  getExpenses: jest.fn().mockResolvedValue([]),
  createExpense: jest.fn().mockResolvedValue({
    id: 'new-1',
    user_id: 'u1',
    title: 'Test',
    amount: 100,
    category: 'Food',
    date: '2026-04-01',
    created_at: ''
  }),
  deleteExpense: jest.fn().mockResolvedValue(undefined),
  updateExpense: jest.fn().mockResolvedValue({
    id: 'new-1',
    user_id: 'u1',
    title: 'Updated',
    amount: 200,
    category: 'Food',
    date: '2026-04-01',
    created_at: ''
  })
}))

describe('expenseStore', () => {
  beforeEach(() => {
    useExpenseStore.setState({
      expenses: [],
      isLoading: false,
      error: null
    })
  })

  it('starts with empty expenses', () => {
    const { expenses } = useExpenseStore.getState()
    expect(expenses).toEqual([])
  })

  it('adds expense to store', async () => {
    const { addExpense } = useExpenseStore.getState()
    await addExpense({
      title: 'Test',
      amount: 100,
      category: 'Food',
      date: '2026-04-01'
    })
    const { expenses } = useExpenseStore.getState()
    expect(expenses.length).toBe(1)
    expect(expenses[0].title).toBe('Test')
  })

  it('deletes expense from store', async () => {
    useExpenseStore.setState({
      expenses: [{
        id: 'new-1', user_id: 'u1', title: 'Test',
        amount: 100, category: 'Food',
        date: '2026-04-01', created_at: ''
      }]
    })
    const { deleteExpense } = useExpenseStore.getState()
    await deleteExpense('new-1')
    const { expenses } = useExpenseStore.getState()
    expect(expenses.length).toBe(0)
  })

  it('filters expenses by category', () => {
    useExpenseStore.setState({
      expenses: [
        { id: '1', user_id: 'u1', title: 'Lunch', amount: 100, category: 'Food', date: '2026-04-01', created_at: '' },
        { id: '2', user_id: 'u1', title: 'Bus', amount: 50, category: 'Transport', date: '2026-04-01', created_at: '' }
      ],
      filters: { category: 'Food', search: '', month: '2026-04' }
    })
    const { getFilteredExpenses } = useExpenseStore.getState()
    const filtered = getFilteredExpenses()
    expect(filtered.length).toBe(1)
    expect(filtered[0].category).toBe('Food')
  })

  it('filters expenses by search', () => {
    useExpenseStore.setState({
      expenses: [
        { id: '1', user_id: 'u1', title: 'Lunch', amount: 100, category: 'Food', date: '2026-04-01', created_at: '' },
        { id: '2', user_id: 'u1', title: 'Bus fare', amount: 50, category: 'Transport', date: '2026-04-01', created_at: '' }
      ],
      filters: { category: 'All', search: 'lunch', month: '2026-04' }
    })
    const { getFilteredExpenses } = useExpenseStore.getState()
    const filtered = getFilteredExpenses()
    expect(filtered.length).toBe(1)
    expect(filtered[0].title).toBe('Lunch')
  })
})