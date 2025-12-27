import { FiDollarSign, FiList, FiTarget } from "react-icons/fi";

interface Props {
  totalIncome: number;
  totalContributed: number;
  recordCount: number;
}

export default function IncomeSummaryCards({
  totalIncome,
  totalContributed,
  recordCount,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Total Income */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-20 border border-green-500 border-opacity-30 rounded-2xl p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-100">Total Income</p>
          <p className="text-xl font-bold mt-1 text-white">
            ₹{totalIncome > 0 ? totalIncome.toLocaleString("en-IN") : 0}
          </p>
        </div>
        <FiDollarSign className="text-green-200 text-2xl" />
      </div>

      {/* Contributed to Goals */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-2xl p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-100">
            Contributed to Goals
          </p>
          <p className="text-xl font-bold mt-1 text-white">
            ₹{totalContributed.toLocaleString("en-IN")}
          </p>
        </div>
        <FiTarget className="text-blue-200 text-2xl" />
      </div>

      {/* Total Records */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 bg-opacity-20 border border-orange-500 border-opacity-30 rounded-2xl p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-orange-100">Total Records</p>
          <p className="text-xl font-bold mt-1 text-white">
            {recordCount.toLocaleString("en-IN")}
          </p>
        </div>
        <FiList className="text-orange-200 text-2xl" />
      </div>
    </div>
  );
}
