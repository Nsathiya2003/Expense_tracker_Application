import { useMemo } from "react";
import { useGetIncome } from "../api/income/income-hooks";
import { useGetExpense } from "../api/expense/expense-hooks";
import { IoWalletOutline } from "react-icons/io5";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

export default function CurrentBalance() {
  // Fetch all income and expense data
  const { data: incomeData } = useGetIncome();
  const { data: expenseData } = useGetExpense();

  // Calculate totals
  const totalIncome = useMemo(() => {
    if (!incomeData?.data) return 0;
    return incomeData.data.reduce(
      (sum: number, item: { income_amount?: number }) =>
        sum + (item.income_amount || 0),
      0
    );
  }, [incomeData?.data]);

  const totalExpense = useMemo(() => {
    if (!expenseData?.data) return 0;
    return expenseData.data.reduce(
      (sum: number, item: { expense_amount?: number }) =>
        sum + (item.expense_amount || 0),
      0
    );
  }, [expenseData?.data]);

  const currentBalance = totalIncome - totalExpense;
  const balancePercentage =
    totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  // Determine balance status color
  const getBalanceColor = () => {
    if (currentBalance >= totalIncome * 0.5) return "text-green-400";
    if (currentBalance >= 0) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 px-6">
      {/* Current Balance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 bg-opacity-10 border border-blue-400 border-opacity-40 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-sm font-semibold">Current Balance</h2>
          <div className="p-2 bg-blue-500 bg-opacity-15 rounded-full">
            <IoWalletOutline size={18} className="text-blue-300" />
          </div>
        </div>
        <div className="space-y-2">
          <p className={`text-3xl font-bold ${getBalanceColor()}`}>
            ₹{currentBalance.toLocaleString("en-IN")}
          </p>
          <div className="w-full bg-gray-700 bg-opacity-40 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                currentBalance >= 0 ? "bg-blue-400" : "bg-red-400"
              }`}
              style={{
                width: `${Math.max(
                  0,
                  Math.min(100, 50 + balancePercentage / 2)
                )}%`,
              }}
            ></div>
          </div>
          <p className="text-gray-300 text-xs">
            {currentBalance >= 0 ? "✓ Balance Available" : "⚠ Balance Low"}
          </p>
        </div>
      </div>

      {/* Total Income */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 bg-opacity-10 border border-green-400 border-opacity-40 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <MdTrendingUp size={18} className="text-green-300" />
          <p className="text-white text-sm font-medium">Total Income</p>
        </div>
        <p className="text-green-200 text-2xl font-bold">
          ₹{totalIncome.toLocaleString("en-IN")}
        </p>
        <p className="text-gray-400 text-xs mt-1">All recorded income</p>
      </div>

      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 bg-opacity-10 border border-red-400 border-opacity-40 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <MdTrendingDown size={18} className="text-red-300" />
          <p className="text-white text-sm font-medium">Total Expenses</p>
        </div>
        <p className="text-red-200 text-2xl font-bold">
          ₹{totalExpense.toLocaleString("en-IN")}
        </p>
        <p className="text-gray-400 text-xs mt-1">All recorded expenses</p>
      </div>
    </div>
  );
}
