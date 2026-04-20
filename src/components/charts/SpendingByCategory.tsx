import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useExpenseStore } from '../../store/expenseStore'
import { getCategoryData } from '../../utils/chartData'
import { formatCurrency } from '../../utils/chartData'

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899']

export const SpendingByCategory = () => {
  const { expenses } = useExpenseStore()
  const data = getCategoryData(expenses)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data yet — add some expenses
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={50}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val) => {
            if (typeof val === "number") {
              return formatCurrency(val);
            }
            return val ?? "";
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}