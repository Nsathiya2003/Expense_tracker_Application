import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { IncomeData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";

interface IncomeMobileCardsProps {
  incomeData: IncomeData[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void; // handle delete action
}

const IncomeMobileCards: React.FC<IncomeMobileCardsProps> = ({
  incomeData,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) return <TableLoader />;

  if (!incomeData.length)
    return (
      <div className="text-center py-12 text-gray-400">
        No income records found
      </div>
    );

  return (
    <div className="md:hidden space-y-4">
      {incomeData.map((item) => (
        <div
          key={item._id}
          className="bg-[rgba(255,255,255,0.05)] border border-gray-700 rounded-xl p-4 space-y-2"
        >
          {/* Header: Category & Date */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-blue-300">
              {item.income_category || "N/A"}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(item.income_date).toLocaleDateString("en-IN")}
            </span>
          </div>

          {/* Amount */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount</span>
            <span className="font-bold text-green-400">
              ₹{item.income_amount?.toLocaleString("en-IN") || 0}
            </span>
          </div>

          {/* Balance */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Balance</span>
            <span className="font-bold text-green-400">
              ₹{item.current_income_amount?.toLocaleString("en-IN") || 0}
            </span>
          </div>

          {/* Goal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Goal</span>
            <span className="text-gray-300">
              {item.goal_id?.goal_name || "—"}
            </span>
          </div>

          {/* Contribution Status & Actions */}
          <div className="flex justify-between items-center pt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                item.saving_contribution
                  ? "bg-green-500/20 text-green-300"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {item.saving_contribution ? "✓ Contributed" : "✗ Not Contributed"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item._id)}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                <BiEdit size={16} />
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                <MdDelete size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeMobileCards;
