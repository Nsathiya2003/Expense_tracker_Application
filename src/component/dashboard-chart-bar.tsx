import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMonthlyExpenseIncome } from "../api/dashboard/dashboard-hooks";

export default function IncomeExpenseChart() {
  const { data: chartData, isLoading, isError } = useMonthlyExpenseIncome();

  // -------- Loading state --------
  if (isLoading) {
    return (
      <div className="bg-[#2E362E] p-5 m-4 rounded-2xl w-full sm:w-[400px] lg:w-[480px] mt-6 animate-pulse">
        <div className="h-4 w-40 bg-gray-600 rounded mb-4" />
        <div className="h-[220px] bg-gray-700/40 rounded-xl" />
      </div>
    );
  }

  // -------- Error state --------
  if (isError) {
    return (
      <div className="bg-[#2E362E] p-5 m-4 rounded-2xl w-full sm:w-[400px] lg:w-[480px] mt-6">
        <p className="text-sm text-red-400">
          Failed to load monthly chart data.
        </p>
      </div>
    );
  }

  const data = chartData?.data || [];

  return (
    <div
      className="bg-gradient-to-br from-[#2E362E] to-[#1F251F]
      p-5 m-4 rounded-2xl w-full sm:w-[400px] lg:w-[480px] mt-6
      shadow-md hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-[#00C8DC]">
          Income vs Expense
        </h2>
        <p className="text-xs text-gray-400">
          Monthly comparison for the current year
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#3A423A"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#9CA3AF"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              backgroundColor: "#1F251F",
              borderRadius: "10px",
              border: "none",
              fontSize: "12px",
              color: "#fff",
            }}
            formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
          />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: "12px" }}
          />

          <Bar
            dataKey="income"
            name="Income"
            fill="rgba(34,197,94,0.85)"
            radius={[6, 6, 0, 0]}
            barSize={14}
          />

          <Bar
            dataKey="expense"
            name="Expense"
            fill="rgba(239,68,68,0.8)"
            radius={[6, 6, 0, 0]}
            barSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
