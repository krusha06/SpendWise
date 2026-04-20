import { render, screen, fireEvent } from '@testing-library/react'
import { ExpenseForm } from '../ExpenseForm'

const mockSubmit = jest.fn()
const mockCancel = jest.fn()

const renderForm = () =>
  render(
    <ExpenseForm
      onSubmit={mockSubmit}
      onCancel={mockCancel}
    />
  )

describe('ExpenseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all form fields', () => {
    renderForm()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText(/Amount/)).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  it('shows error when title is empty', () => {
    renderForm()
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }))
    expect(screen.getByText('Title is required')).toBeInTheDocument()
  })

  it('shows error when amount is negative', () => {
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('e.g. Lunch at cafe'), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '-50' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }))
    expect(screen.getByText('Amount must be positive')).toBeInTheDocument()
  })

  it('calls onSubmit with correct data when valid', () => {
    renderForm()
    fireEvent.change(screen.getByPlaceholderText('e.g. Lunch at cafe'), {
      target: { value: 'Lunch' }
    })
    fireEvent.change(screen.getByPlaceholderText('0.00'), {
      target: { value: '150' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Expense' }))
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Lunch', amount: 150 })
    )
  })

  it('calls onCancel when cancel is clicked', () => {
    renderForm()
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockCancel).toHaveBeenCalled()
  })
})