import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { IncomeData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";

interface Props {
  isLoading: boolean;
  incomeData: IncomeData[];
  onEdit: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteDialog: (v: boolean) => void;
}

export default function IncomeTableDesktop({
  isLoading,
  incomeData,
  onEdit,
  setDeleteId,
  setDeleteDialog,
}: Props) {
  return (
    <div
      className="hidden md:block bg-[rgba(255,255,255,0.05)] border border-gray-700 
      shadow-lg backdrop-blur-md rounded-xl overflow-hidden"
    >
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="py-4 px-4 text-left font-semibold">Category</th>
            <th className="py-4 px-4 text-left font-semibold">Amount</th>
            <th className="py-4 px-4 text-left font-semibold">Date</th>
            <th className="py-4 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <TableLoader />
          ) : incomeData.length > 0 ? (
            incomeData.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-700 hover:bg-[rgba(84,175,84,0.1)] transition ${
                  index % 2 === 0
                    ? "bg-[rgba(255,255,255,0.02)]"
                    : "bg-[rgba(255,255,255,0.05)]"
                }`}
              >
                {/* Category */}
                <td className="py-4 px-4 font-semibold text-white">
                  <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {item.income_category || "N/A"}
                  </span>
                </td>

                {/* Amount */}
                <td className="py-4 px-4 font-bold text-green-400">
                  ₹{item.income_amount?.toLocaleString("en-IN") || 0}
                </td>

                {/* Date */}
                <td className="py-4 px-4 text-gray-300 text-sm">
                  <span className="bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
                    {new Date(item.income_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onEdit(item._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                      title="Edit Income"
                    >
                      <BiEdit size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(item._id);
                        setDeleteDialog(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                      title="Delete Income"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-12 text-gray-400 text-base"
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">📭</p>
                  <p>No income records found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
