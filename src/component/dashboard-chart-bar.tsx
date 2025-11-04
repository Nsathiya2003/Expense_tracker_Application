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

const data = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 1890, expense: 4800 },
  { month: "Jun", income: 2390, expense: 3800 },
  { month: "Jul", income: 3490, expense: 4300 },
  { month: "Aug", income: 4000, expense: 2400 },
  { month: "Sep", income: 3000, expense: 1398 },
  { month: "Oct", income: 2000, expense: 9800 },
  { month: "Nov", income: 2780, expense: 3908 },
  { month: "Dec", income: 1890, expense: 8000 },
];

export default function IncomeExpenseChart() {
  return (
    <div className="bg-[#2E362E] p-4 m-4 rounded-2xl w-full sm:w-[400px] lg:w-[480px] mt-6">
      <h2 className="text-lg font-semibold mb-3 text-start text-[#00C8DC]">
        Monthly Income vs Expense
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f63" />
          <XAxis dataKey="month" stroke="#ccc" fontSize={11} />
          <YAxis stroke="#ccc" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e1e30",
              borderRadius: "10px",
              border: "none",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="income" fill="rgba(34,197,94,0.8)" radius={[6, 6, 0, 0]} barSize={18} />
          <Bar dataKey="expense" fill="rgba(230, 162, 162, 0.8)" radius={[6, 6, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
