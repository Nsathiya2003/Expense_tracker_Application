import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// import { FiFilter } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import FilterDialog from "../../component/filter";
import { useNavigate } from "react-router-dom";

export default function GoalTable() {
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
      id: 5,
      category: "Investment",
      amount: "₹7,500",
      date: "10 Aug 2025",
      mode: "Cash",
    },
  ];
  const navigate = useNavigate();
  const ViewHistory = () => {
    navigate("/goal-history");
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //   const handleFilter = () => setFilterOpen(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="overflow-x-auto text-gray-200 ">
      {/* Table */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl border border-gray-700 shadow-lg backdrop-blur-md">
        <table className="w-full text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-2 px-4 text-left font-semibold">Sl.No</th>
              <th className="py-2 px-4 text-left font-semibold">Category</th>
              <th className="py-2 px-4 text-left font-semibold">Amount</th>
              <th className="py-2 px-4 text-left font-semibold">Date</th>
              <th className="py-2 px-4 text-left font-semibold">
                Payment Mode
              </th>
              <th className="py-2 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.1)] transition ${
                  index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                }`}
              >
                <td className="py-4 px-4">{item.id}</td>
                <td className="py-4 px-4">{item.category}</td>
                <td className="py-4 px-4">{item.amount}</td>
                <td className="py-4 px-4">{item.date}</td>
                <td className="py-4 px-4">{item.mode}</td>
                <td className="py-4 px-4 flex items-center gap-3">
                  {/* Edit */}
                  <div className="relative group">
                    <BiEdit className="text-blue-400 text-xl cursor-pointer hover:text-blue-300" />
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Edit
                    </span>
                  </div>
                  {/* Delete */}
                  <div className="relative group">
                    <MdDelete className="text-red-500 text-xl cursor-pointer hover:text-red-400" />
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Delete
                    </span>
                  </div>
                  {/* View */}
                  <div className="relative group">
                    <IoEye
                      className="text-green-500 text-xl cursor-pointer hover:text-green-400"
                      onClick={ViewHistory}
                    />
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      View
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <IoIosArrowBack
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`text-2xl cursor-pointer transition ${
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
          className={`text-2xl cursor-pointer transition ${
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
