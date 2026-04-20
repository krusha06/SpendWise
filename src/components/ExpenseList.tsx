import { useState } from 'react'
import { useExpenseStore } from '../store/expenseStore'
import { ExpenseForm } from './ExpenseForm'
import type { Expense, ExpenseCategory } from '../types'

const CATEGORY_COLORS: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Shopping: 'bg-pink-100 text-pink-700',
  Bills: 'bg-red-100 text-red-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Health: 'bg-green-100 text-green-700',
  Other: 'bg-gray-100 text-gray-700'
}

export const ExpenseList = () => {
  const { deleteExpense, updateExpense, getFilteredExpenses, isLoading } = useExpenseStore()
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  const expenses = getFilteredExpenses()

  const handleUpdate = async (updates: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => {
    if (!editingExpense) return
    await updateExpense(editingExpense.id, updates)
    setEditingExpense(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">💸</div>
        <p className="font-medium">No expenses yet</p>
        <p className="text-sm">Add your first expense using the button above</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {expenses.map(expense => (
          <div
            key={expense.id}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                    {expense.title}
                </p>
                <p className="text-xs text-gray-400">
                    {expense.date}
                    <span className={`text-xs font-medium px-2 py-1 mx-2 rounded-full ${CATEGORY_COLORS[expense.category]}`}>
                        {expense.category}
                    </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-800">
                ₹{expense.amount.toLocaleString()}
              </span>
              <button
                onClick={() => setEditingExpense(expense)}
                className="text-xs text-indigo-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingExpense && (
        <ExpenseForm
          initial={editingExpense}
          onSubmit={handleUpdate}
          onCancel={() => setEditingExpense(null)}
        />
      )}
    </>
  )
}