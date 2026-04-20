import { useEffect, useState } from 'react'
import { useBudgetStore } from '../store/budgetStore'
import { useExpenseStore } from '../store/expenseStore'
import { formatCurrency } from '../utils/chartData'

export const BudgetTracker = () => {
  const { monthlyBudget, fetchBudget, saveBudget } = useBudgetStore()
  const { getTotalSpend } = useExpenseStore()
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchBudget()
  }, [])

  const totalSpend = getTotalSpend()
  const percentage = monthlyBudget > 0
    ? Math.min((totalSpend / monthlyBudget) * 100, 100)
    : 0

  const isWarning = percentage >= 80 && percentage < 100
  const isOver = percentage >= 100

  const barColor = isOver
    ? 'bg-red-500'
    : isWarning
    ? 'bg-amber-400'
    : 'bg-indigo-500'

  const handleSave = async () => {
    const val = parseFloat(input)
    if (!isNaN(val) && val > 0) {
      await saveBudget(val)
    }
    setEditing(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Monthly Budget</h3>
        <button
          onClick={() => { setInput(monthlyBudget.toString()); setEditing(true) }}
          className="text-xs text-indigo-600 hover:underline"
        >
          {monthlyBudget === 0 ? 'Set budget' : 'Edit'}
        </button>
      </div>

      {editing ? (
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter monthly budget"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="border border-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          {monthlyBudget === 0 ? (
            <p className="text-sm text-gray-400">
              No budget set — click "Set budget" to track your spending limit
            </p>
          ) : (
            <>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">
                  Spent: <span className="font-semibold text-gray-800">{formatCurrency(totalSpend)}</span>
                </span>
                <span className="text-gray-500">
                  Limit: <span className="font-semibold text-gray-800">{formatCurrency(monthlyBudget)}</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-2 text-xs">
                {isOver && (
                  <p className="text-red-500 font-medium">
                    ⚠️ Over budget by {formatCurrency(totalSpend - monthlyBudget)}!
                  </p>
                )}
                {isWarning && !isOver && (
                  <p className="text-amber-500 font-medium">
                    ⚠️ {Math.round(percentage)}% of budget used — spending high
                  </p>
                )}
                {!isWarning && !isOver && monthlyBudget > 0 && (
                  <p className="text-gray-400">
                    {formatCurrency(monthlyBudget - totalSpend)} remaining this month
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}