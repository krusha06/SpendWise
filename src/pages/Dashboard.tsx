import { useEffect, useState } from 'react'
import { useExpenseStore } from '../store/expenseStore'
import { useAuthStore } from '../store/authStore'
import { ExpenseList } from '../components/ExpenseList'
import { ExpenseForm } from '../components/ExpenseForm'
import { FilterBar } from '../components/FilterBar'
import { BudgetTracker } from '../components/BudgetTracker'
import { SpendingByCategory } from '../components/charts/SpendingByCategory'
import { MonthlyTrend } from '../components/charts/MonthlyTrend'
import { signOut } from '../services/auth'
import { formatCurrency } from '../utils/chartData'
import type { Expense } from '../types'

export const Dashboard = () => {
  const { fetchExpenses, addExpense, getTotalSpend, expenses } = useExpenseStore()
  const { user } = useAuthStore()
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'expenses' | 'charts'>('expenses')

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleAdd = async (expense: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => {
    await addExpense(expense)
    setShowForm(false)
  }

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-800">💰 SpendWise</h1>
          <p className="text-xs text-gray-400">
            Hey, {user?.full_name || user?.email} 👋
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-400 hover:text-red-500 transition"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <p className="text-sm text-indigo-200 mb-1">This month's spending</p>
          <p className="text-4xl font-bold mb-4">{formatCurrency(getTotalSpend())}</p>
          <div className="flex gap-4 text-sm text-indigo-200">
            <span>{expenses.length} total transactions</span>
          </div>
        </div>

        {/* Budget Tracker */}
        <BudgetTracker />

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'expenses'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              activeTab === 'charts'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Charts
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'expenses' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800">Transactions</h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                + Add Expense
              </button>
            </div>
            <FilterBar />
            <ExpenseList />
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Spending by Category
              </h3>
              <SpendingByCategory />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Monthly Trend
              </h3>
              <MonthlyTrend />
            </div>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {showForm && (
        <ExpenseForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}