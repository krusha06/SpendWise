import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import { useExpenseStore } from '../../store/expenseStore'
import { getMonthlyTrend, formatCurrency } from '../../utils/chartData'

export const MonthlyTrend = () => {
  const { expenses } = useExpenseStore()
  const data = getMonthlyTrend(expenses)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data yet — add some expenses
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v}`} />
        <Tooltip formatter={(val) => {
            if (typeof val === "number") {
              return formatCurrency(val);
            }
            return val ?? "";
          }}
        />
        <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}