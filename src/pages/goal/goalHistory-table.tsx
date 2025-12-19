import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import FilterDialog from "../../dialog/filter";
import { FiFilter } from "react-icons/fi";
import { useViewGoalHistory } from "../../api/goal/goal-hooks";
import TableLoader from "../../utils/TableLoader";
import type { GoalHistoryData } from "../../types/types";

export default function GoalHistoryTable() {
  // const data = [
  //   {
  //     id: 1,
  //     category: "Salary",
  //     amount: "₹23,556",
  //     date: "30 Oct 2025",
  //     mode: "Cash",
  //   },
  //   {
  //     id: 2,
  //     category: "Freelance",
  //     amount: "₹12,000",
  //     date: "15 Oct 2025",
  //     mode: "Bank",
  //   },
  //   {
  //     id: 3,
  //     category: "Gift",
  //     amount: "₹5,000",
  //     date: "20 Sep 2025",
  //     mode: "UPI",
  //   },
  //   {
  //     id: 4,
  //     category: "Investment",
  //     amount: "₹7,500",
  //     date: "10 Aug 2025",
  //     mode: "Cash",
  //   },
  //   {
  //     id: 4,
  //     category: "Investment",
  //     amount: "₹7,500",
  //     date: "10 Aug 2025",
  //     mode: "Cash",
  //   },
  // ];

  const navigate = useNavigate();
  const ViewHistory = () => navigate("/goal-history");

  // const handleFilter = () => {
  //   setFilterOpen(true);
  // };

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const { data: filterData, isLoading } = useViewGoalHistory(filters);
  const goalsHistory = filterData?.data || [];
  const totalPages = filterData?.pagination?.totalPages || 1;
  const hasPrevPage = filterData?.pagination?.hasPrevPage;
  const hasNextPage = filterData?.pagination?.hasNextPage;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="flex flex-col mt-8 w-full items-center">
      {/* Header Row */}
      <div className="flex items-center justify-between w-full max-w-[1100px] mb-6">
        {/* Title */}
        <h1 className="text-[#54af54] font-semibold text-2xl tracking-wide">
          View Income
        </h1>

        {/* Search Box + Filter Icon */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              className="w-[250px] h-11 px-4 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {/* Filter Icon */}
          <FiFilter
            className="text-[#54af54] text-2xl cursor-pointer hover:text-[#6ecf6e] transition"
            // onClick={handleFilter}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md">
        <table className="md:w-[1000px] text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4 text-left font-semibold">
                Allocated Amount
              </th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>

              <th className="py-3 px-4 text-left font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                {goalsHistory.length > 0 &&
                  goalsHistory.map((item: GoalHistoryData, index: number) => (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.08)] transition-colors ${
                        index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                      }`}
                    >
                      <td className="py-3 px-4">{item.income_type}</td>
                      <td className="py-3 px-4">{item.allocated_amount}</td>
                      <td className="py-3 px-4">
                        {new Date(item?.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 flex justify-center items-center gap-4">
                        <BiEdit
                          className="text-blue-400 text-lg cursor-pointer hover:text-blue-300 transition"
                          title="Edit"
                        />
                        <MdDelete
                          className="text-red-500 text-lg cursor-pointer hover:text-red-400 transition"
                          title="Delete"
                        />
                        <IoEye
                          className="text-green-500 text-lg cursor-pointer hover:text-green-400 transition"
                          onClick={ViewHistory}
                          title="View"
                        />
                      </td>
                    </tr>
                  ))}
              </>
            )}
            {goalsHistory.length === 0 && (
              <tr>
                <td
                  // colSpan="6"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No goal history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Page Limit Dropdown - Right aligned */}
      <div className="flex justify-start items-center gap-3 mb-4">
        <span className="text-gray-400 text-sm">Rows per page:</span>
        <div className="relative">
          <select
            className="bg-gray-800 text-white mt-2 px-3 py-1.5 rounded-lg pr-6 pl-2 cursor-pointer border border-gray-600 hover:border-gray-400 transition"
            value={filters.limit}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: Number(e.target.value),
                page: 1,
              }))
            }
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* Prev Button */}
          <IoIosArrowBack
            onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
            className={`text-2xl cursor-pointer transition ${
              !hasPrevPage
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white"
            }`}
          />

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filters.page === pageNum
                    ? "bg-[#54af54] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <IoIosArrowForward
            onClick={() => hasNextPage && handlePageChange(filters.page + 1)}
            className={`text-2xl cursor-pointer transition ${
              !hasNextPage
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white"
            }`}
          />
        </div>
      )}

      {/* Filter Dialog */}
      {/* <FilterDialog open={filterOpen} onClose={() => setFilterOpen(false)} /> */}
    </div>
  );
}
