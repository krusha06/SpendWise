import { useExpenseStore } from '../store/expenseStore'
import type { ExpenseCategory } from '../types'

const CATEGORIES = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other']

export const FilterBar = () => {
  const { filters, setFilter } = useExpenseStore()

  return (
    <div className="flex mb-6 justify-between">
        <div className='flex flex-wrap gap-3'>
            <select
                value={filters.category}
                onChange={e => setFilter({ category: e.target.value as ExpenseCategory | 'All' })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
                type="month"
                value={filters.month}
                onChange={e => setFilter({ month: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div>
            <input
                type="text"
                placeholder="Search expenses..."
                value={filters.search}
                onChange={e => setFilter({ search: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
        </div>
    </div>
  )
}