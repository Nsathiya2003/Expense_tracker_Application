import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { IoEye } from "react-icons/io5";
import { useState } from "react";
import FilterDialog from "../../dialog/filter";
import { useDeleteGoal, useGoalFilter } from "../../api/goal/goal-hooks";
import type { GoalData } from "../../types/types";
import TableLoader from "../../utils/TableLoader";
import { DeleteDialog } from "../../dialog/delete-dialog";
// import { FiFilter } from "react-icons/fi";

export default function GoalTable({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  // const navigate = useNavigate();
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
    status: "",
  });
  const [tempFilters, setTempFilters] = useState({ ...filters });

  // --- Fetch filtered + paginated goals ---
  const { data: filterData, isLoading } = useGoalFilter(filters);

  const goals = filterData?.data || [];
  const totalPages = filterData?.pagination?.totalPages || 1;
  const hasPrevPage = filterData?.pagination?.hasPrevPage;
  const hasNextPage = filterData?.pagination?.hasNextPage;

  // const handleFilter = () => {
  //   setFilterOpen(true);
  // };

  // --- Handlers ---
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  console.log(filters, "filters----");

  // const viewHistory = () => navigate("/goal-history");

  const handleDelete = (item: GoalData) => {
    setDeleteDialog(true);
    setDeleteId(item?._id);
  };

  // delete mutation (top-level hook)
  const deleteMutation = useDeleteGoal({
    onSuccess: () => {
      setDeleteDialog(false);
      setDeleteId(null);
    },
  });

  return (
    <div className="overflow-x-auto text-gray-200">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-[#548f54] font-semibold text-2xl tracking-wide">
          View Goals
        </h1>

        {/* Search Box + Filter Icon */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center border border-gray-600 rounded-lg bg-[rgba(255,255,255,0.1)] backdrop-blur-md overflow-hidden mt-10">
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

          {/* Filter Icon */}
          {/* <FiFilter
            className="text-[#548f54] text-2xl cursor-pointer hover:text-[#6ecf6e] transition"
            onClick={handleFilter}
          /> */}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-4 px-4 text-left font-semibold">Goal Name</th>
              <th className="py-4 px-4 text-left font-semibold">
                Target Amount
              </th>
              <th className="py-4 px-4 text-left font-semibold">
                Allocated Amount
              </th>
              <th className="py-4 px-4 text-left font-semibold">Target Date</th>
              <th className="py-4 px-4 text-left font-semibold">Status</th>
              <th className="py-4 px-4 text-center font-semibold">Action</th>
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
                      className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.08)] transition-colors ${
                        index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                      }`}
                    >
                      <td className="py-4 px-4 font-medium text-white">
                        {item.goal_name}
                      </td>
                      <td className="py-4 px-4 text-green-400 font-semibold">
                        ₹{item.target_amount?.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-blue-400">
                        ₹{item.allocated_amount?.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(item?.deadline_date).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            item.status === "PENDING"
                              ? "bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-40"
                              : item.status === "completed"
                              ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-40"
                              : "bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-40"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 flex items-center justify-center gap-4">
                        {/* Edit */}
                        <div className="relative group">
                          <BiEdit
                            className="text-blue-400 text-lg cursor-pointer hover:text-blue-300 transition-colors"
                            onClick={() => onEdit(item._id)}
                            title="Edit"
                          />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
                            Edit Goal
                          </span>
                        </div>
                        {/* Delete */}
                        <div className="relative group">
                          <MdDelete
                            className="text-red-500 text-lg cursor-pointer hover:text-red-400 transition-colors"
                            onClick={() => handleDelete(item)}
                            title="Delete"
                          />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
                            Delete Goal
                          </span>
                        </div>
                        {/* View */}
                        {/* <div className="relative group">
                          <IoEye
                            className="text-green-500 text-lg cursor-pointer hover:text-green-400 transition-colors"
                            onClick={viewHistory}
                            title="View History"
                          />
                          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
                            View History
                          </span>
                        </div> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-8 text-gray-400 text-base"
                    >
                      No goals found. Create your first goal to get started!
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Page Limit Dropdown */}
      <div className="flex justify-start items-center gap-3 mt-6 mb-4">
        <span className="text-gray-400 text-sm">Rows per page:</span>

        <div className="relative">
          <select
            className="bg-gray-800 text-white px-3 py-1.5 rounded-lg pr-8 pl-3 cursor-pointer border border-gray-600 hover:border-gray-400 transition focus:outline-none focus:ring-2 focus:ring-[#548f54] focus:ring-opacity-50"
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
        <div className="flex justify-center items-center gap-2 mt-8 mb-6">
          {/* Prev Button */}
          <IoIosArrowBack
            onClick={() => hasPrevPage && handlePageChange(filters.page - 1)}
            className={`text-2xl cursor-pointer transition ${
              !hasPrevPage
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-[#548f54]"
            }`}
          />

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  filters.page === pageNum
                    ? "bg-[#548f54] text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
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
                : "text-gray-300 hover:text-[#548f54]"
            }`}
          />
        </div>
      )}

      {/* Filter Dialog */}
      <FilterDialog
        open={filterOpen}
        onClose={() => {
          // Cancel clicked: reset dialog fields, trigger API with original/default filters
          const defaultFilters = {
            page: 1,
            limit: 10,
            search: "",
            fromDate: "",
            toDate: "",
            deadline_date: "",
            status: "",
          };

          // Option 1: Restore previous applied filters (no API call)
          // setTempFilters(filters);
          // setFilterOpen(false);

          // Option 2: Reset filters to default and trigger API call
          setTempFilters(defaultFilters); // reset dialog inputs
          setFilters(defaultFilters); // triggers API call with default values
          setFilterOpen(false);
        }}
        onApply={() => {
          // Apply clicked: take the temp values and call API
          setFilters({
            page: 1, // reset page
            limit: tempFilters.limit,
            search: tempFilters.search,
            fromDate: tempFilters.fromDate,
            toDate: tempFilters.toDate,
            deadline_date: tempFilters.deadline_date,
            status: tempFilters.status,
          }); // triggers API
          setFilterOpen(false);
        }}
        className="absolute top-[380px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl 
    shadow-2xl border border-gray-700 w-[360px]
    data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
      >
        <>
          {/* Date Fields */}
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={tempFilters.fromDate}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={tempFilters.toDate}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Target Date */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Target Date
            </label>
            <input
              type="date"
              name="deadline_date"
              value={tempFilters.deadline_date}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-2 py-2 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1 font-medium">
              Status
            </label>
            <select
              name="status"
              value={tempFilters.status}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="w-full bg-[#3a3a5c] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none text-sm"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </>
      </FilterDialog>

      {/* Delete Dialog */}
      <DeleteDialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onDelete={(id: string) => deleteMutation.mutate(id)}
        deleteId={deleteId}
      />
    </div>
  );
}
