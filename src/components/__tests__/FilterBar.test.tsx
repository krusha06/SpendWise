import { render, screen, fireEvent } from '@testing-library/react'
import { FilterBar } from '../FilterBar'
import { useExpenseStore } from '../../store/expenseStore'

describe('FilterBar', () => {
  beforeEach(() => {
    useExpenseStore.setState({
      filters: { category: 'All', search: '', month: '2026-04' }
    })
  })

  it('renders search input', () => {
    render(<FilterBar />)
    expect(screen.getByPlaceholderText('Search expenses...')).toBeInTheDocument()
  })

  it('renders category dropdown', () => {
    render(<FilterBar />)
    expect(screen.getByDisplayValue('All')).toBeInTheDocument()
  })

  it('updates search filter on input', () => {
    render(<FilterBar />)
    fireEvent.change(screen.getByPlaceholderText('Search expenses...'), {
      target: { value: 'lunch' }
    })
    const { filters } = useExpenseStore.getState()
    expect(filters.search).toBe('lunch')
  })

  it('updates category filter on select', () => {
    render(<FilterBar />)
    fireEvent.change(screen.getByDisplayValue('All'), {
      target: { value: 'Food' }
    })
    const { filters } = useExpenseStore.getState()
    expect(filters.category).toBe('Food')
  })
})