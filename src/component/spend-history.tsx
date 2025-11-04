import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendData } from "../data/spend-history-items";

export default function SpendHistory() {
  return (
    <div className="bg-[#2E362E] p-4 m-4 rounded-2xl w-full sm:w-[400px] lg:w-[620px] mt-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Spend History (Last Month)
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={spendData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* 💚 Full light green area fill */}
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E1E2E",
              border: "1px solid #444",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#fff" }}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#22C55E"
            strokeWidth={3}
            fill="url(#colorExpense)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
