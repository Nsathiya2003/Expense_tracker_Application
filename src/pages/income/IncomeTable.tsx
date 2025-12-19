import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import React, { useState } from "react";
import FilterDialog from "../../dialog/filter";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useIncomeFilter } from "../../api/income/income-hooks";
import TableLoader from "../../utils/TableLoader";
import type { IncomeData } from "../../types/types";
// import { useNavigate } from "react-router-dom";
import { useFindAllGoal } from "../../api/goal/goal-hooks";
import type { GoalDataTypes } from "../../types/response-types";

export default function IncomeTable({
  onEdit,
}: {
  onEdit: (id: string) => void;
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  // const navigate = useNavigate();

  // const handleEdit = (item: IncomeData) => {
  //   // setEditId(item?._id);
  //   navigate(`/transaction/income/${item?._id}`);
  // };

  const handleFilter = () => {
    setFilterOpen(true);
  };

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    fromDate: "",
    toDate: "",
    deadline_date: "",
    status: "",
    goal_id: "",
  });
  const [tempFilters, setTempFilters] = useState({ ...filters });
  console.log("tempFilters----", tempFilters);
  // const [localGoalId, setLocalGoalId] = useState<string>();

  const { data: filterData, isLoading } = useIncomeFilter(filters);
  const { data: GoalData } = useFindAllGoal();

  console.log("filterData is----", filterData?.data);

  const incomeData = filterData?.data || [];
  const totalPages = filterData?.pagination?.totalPages || 1;
  const hasPrevPage = filterData?.pagination?.hasPrevPage;
  const hasNextPage = filterData?.pagination?.hasNextPage;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };
  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    console.log("name & value is----", name);
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="overflow-x-auto mt-10 px-6 text-gray-200">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-[#54af54] font-semibold text-2xl tracking-wide">
          View Income
        </h1>

        {/* Search Box and Filter Icon */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
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
            <FiFilter
              className="text-[#54af54] text-2xl cursor-pointer hover:text-[#6ecf6e] transition"
              onClick={handleFilter}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[rgba(255,255,255,0.05)] border border-gray-700 shadow-lg backdrop-blur-md">
        <table className="w-full text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Category</th>
              <th className="py-2 px-4 text-left font-semibold">
                Income Amount
              </th>
              <th className="py-2 px-4 text-left font-semibold">
                Goal Contribution
              </th>
              <th className="py-2 px-4 text-left font-semibold">Goal Name</th>
              <th className="py-2 px-4 text-left font-semibold">Goal Amount</th>
              <th className="py-2 px-4 text-left font-semibold">Date</th>
              <th className="py-2 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                {incomeData.length > 0 ? (
                  incomeData.map((item: IncomeData, index: number) => (
                    <tr
                      key={item._id}
                      className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.1)] transition ${
                        index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        {item.income_category ? item.income_category : "N/A"}
                      </td>
                      <td className="py-4 px-4">{item.income_amount}</td>
                      <td className="py-4 px-4">
                        {item.saving_contribution === true ? "Yes" : "No"}
                      </td>
                      <td className="py-4 px-4">{item.goal_id?.goal_name}</td>
                      <td className="py-4 px-4">
                        {item.goal_contribute_amount}
                      </td>

                      <td className="py-4 px-4">
                        {new Date(item?.income_date).toLocaleDateString()}
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
                            // onClick={() => handleDelete(item)}
                          />
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Delete
                          </span>
                        </div>
                        {/* View */}
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

      {/* filter component */}
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
            goal_id: "",
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
            goal_id: tempFilters.goal_id,
          }); // triggers API
          setFilterOpen(false);
        }}
        className="absolute top-[420px] right-[80px] bg-[#2E2E48] text-white p-6 rounded-2xl 
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
          {/* <div>
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
          </div> */}
          <div>
            <label className="block text-sm text-gray-300 mb-1 font-medium">
              Choose Goal
            </label>
            <select
              id="category"
              name="goal_id"
              className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
                bg-[rgba(255,255,255,0.15)] text-white text-sm
                focus:outline-none focus:ring-2 focus:ring-green-400
                transition-all duration-200 appearance-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
              }}
              value={tempFilters.goal_id}
              onChange={(e) => handleChange(e)}
            >
              {GoalData?.data && GoalData?.data?.length > 0 ? (
                GoalData?.data.map((item: GoalDataTypes, index: number) => (
                  <option
                    value={item?._id}
                    key={index}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      color: "white",
                    }}
                    className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
                bg-[rgba(255,255,255,0.15)] "
                  >
                    {item?.goal_name}
                  </option>
                ))
              ) : (
                <p>No data found....</p>
              )}
            </select>
          </div>
        </>
      </FilterDialog>

      {/* Add Income component*/}
      {/* {editId && <AddIncome id={editId} />} */}
    </div>
  );
}
