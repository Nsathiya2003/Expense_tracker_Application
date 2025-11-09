import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterDialog from "../../component/filter";
import { FiFilter } from "react-icons/fi";

export default function GoalHistoryTable() {
  const data = [
    {
      id: 1,
      category: "Salary",
      amount: "₹23,556",
      date: "30 Oct 2025",
      mode: "Cash",
    },
    {
      id: 2,
      category: "Freelance",
      amount: "₹12,000",
      date: "15 Oct 2025",
      mode: "Bank",
    },
    {
      id: 3,
      category: "Gift",
      amount: "₹5,000",
      date: "20 Sep 2025",
      mode: "UPI",
    },
    {
      id: 4,
      category: "Investment",
      amount: "₹7,500",
      date: "10 Aug 2025",
      mode: "Cash",
    },
    {
      id: 4,
      category: "Investment",
      amount: "₹7,500",
      date: "10 Aug 2025",
      mode: "Cash",
    },
  ];

  const navigate = useNavigate();
  const ViewHistory = () => navigate("/goal-history");

  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleFilter = () => {
    setFilterOpen(true);
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
            onClick={handleFilter}
          />
        </div>
      </div>

      {/* Table Container */}
      <div
        className="bg-[#1E1E2E] border border-[#2B2B40] shadow-md 
               w-full max-w-[1100px] h-[266px] overflow-y-auto overflow-x-hidden 
               scrollbar-thin scrollbar-thumb-[#54af54]/70 scrollbar-track-[#2E2E48]"
      >
        <table className="w-full text-sm text-gray-200">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Sl.No</th>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4 text-left font-semibold">Amount</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Mode</th>
              <th className="py-3 px-4 text-left font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.08)] transition-colors ${
                  index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                }`}
              >
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4 text-[#77dd77] font-medium">
                  {item.amount}
                </td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.mode}</td>
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

            {currentData.length === 0 && (
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <IoIosArrowBack
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`text-xl cursor-pointer transition ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-300 hover:text-white"
          }`}
        />

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              currentPage === i + 1
                ? "bg-[#54af54] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <IoIosArrowForward
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className={`text-xl cursor-pointer transition ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-300 hover:text-white"
          }`}
        />
      </div>

      {/* Filter Dialog */}
      <FilterDialog open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
