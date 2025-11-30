import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import FilterDialog from "../../dialog/filter";
import { useNavigate } from "react-router-dom";
import { useDeleteGoal, useGoalFilter } from "../../api/goal/goal-hooks";
import type { GoalData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";
import { DeleteDialog } from "../../dialog/delete-dialog";

export default function GoalTable({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    fromDate: "",
    toDate: "",
    deadline_date: "",
  });

  // --- Fetch filtered + paginated goals ---
  const { data: filterData, isLoading } = useGoalFilter(filters);

  const goals = filterData?.data || [];
  const totalPages = filterData?.pagination?.totalPages || 1;
  const hasPrevPage = filterData?.pagination?.hasPrevPage;
  const hasNextPage = filterData?.pagination?.hasNextPage;

  // --- Handlers ---
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  // const handleDateFilter = (from: string, to: string) => {
  //   setFilters(prev => ({ ...prev, fromDate: from, toDate: to, page: 1 }));
  // };

  const viewHistory = () => navigate("/goal-history");

  const handleDelete = (item: GoalData) => {
    setDeleteDialog(true);
    setDeleteId(item?._id);
  };

  return (
    <div className="overflow-x-auto text-gray-200">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-[#54af54] font-semibold text-2xl tracking-wide">
          View Goals
        </h1>

        {/* Search Box */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search here..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[250px] h-11 px-4 bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl border border-gray-700 shadow-lg backdrop-blur-md">
        <table className="w-full text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Goal Name</th>
              <th className="py-2 px-4 text-left font-semibold">Goal Amount</th>
              <th className="py-2 px-4 text-left font-semibold">Target Date</th>
              <th className="py-2 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                {goals.length > 0 ? (
                  goals.map((item: GoalData, index: number) => (
                    <tr
                      key={item._id}
                      className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.1)] transition ${
                        index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                      }`}
                    >
                      <td className="py-4 px-4">{item.goal_name}</td>
                      <td className="py-4 px-4">{item.target_amount}</td>
                      <td className="py-4 px-4">
                        {new Date(item?.deadline_date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 flex items-center gap-3">
                        {/* Edit */}
                        <div className="relative group">
                          <BiEdit
                            className="text-blue-400 text-xl cursor-pointer hover:text-blue-300"
                            onClick={() => onEdit(item._id)}
                          />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Edit
                          </span>
                        </div>
                        {/* Delete */}
                        <div className="relative group">
                          <MdDelete
                            className="text-red-500 text-xl cursor-pointer hover:text-red-400"
                            onClick={() => handleDelete(item)}
                          />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Delete
                          </span>
                        </div>
                        {/* View */}
                        <div className="relative group">
                          <IoEye
                            className="text-green-500 text-xl cursor-pointer hover:text-green-400"
                            onClick={viewHistory}
                          />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            View
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 text-gray-400 text-base"
                    >
                      No data found...
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* Page Limit Dropdown - Right aligned */}
      <div className="flex justify-end items-center gap-3 mb-4">
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

          {/* Dropdown Arrow Icon */}
          {/* <span className="absolute right-2 top-2.5 pointer-events-none text-gray-400">
            ▼
          </span> */}
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
      <FilterDialog open={filterOpen} onClose={() => setFilterOpen(false)} />

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        deleteConfirmed={useDeleteGoal({
          onSuccess: () => setDeleteDialog(false),
        })}
        deleteId={deleteId}
      />
    </div>
  );
}
