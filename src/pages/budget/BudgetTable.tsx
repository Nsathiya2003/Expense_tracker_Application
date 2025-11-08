import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import FilterDialog from "../../component/filter";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function BudgetTable() {
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

  const [filterOpen, setFilterOpen] = useState(false);

  //pagination...
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilter = () => {
    setFilterOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="px-6 text-gray-200 mt-4 w-full max-w-[1200px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-[#54af54] font-semibold text-2xl tracking-wide">
          View Budget
        </h1>

        {/* Search Box and Filter Icon */}
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

          {/* Filter Icon (separate but aligned) */}
          <FiFilter
            className="text-[#54af54] text-2xl cursor-pointer hover:text-[#6ecf6e] transition"
            onClick={handleFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl border border-gray-700 shadow-lg backdrop-blur-md">
        <table className="min-w-full text-sm">
          <thead className="bg-[#2E2E48] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Sl.No</th>
              <th className="py-3 px-4 text-left font-semibold">Category</th>
              <th className="py-3 px-4 text-left font-semibold">Amount</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">
                Payment Mode
              </th>
              <th className="py-3 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-700 hover:bg-[rgba(255,255,255,0.1)] transition  ${
                  index % 2 === 0 ? "bg-[rgba(255,255,255,0.03)]" : ""
                }`}
              >
                <td className="py-4 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.amount}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.mode}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button className="hover:scale-110 transition">
                    <BiEdit className="text-blue-400 text-xl cursor-pointer hover:text-blue-300" />
                  </button>
                  <button className="hover:scale-110 transition">
                    <MdDelete className="text-red-500 text-xl cursor-pointer hover:text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination*/}
      <div className="flex justify-center items-center gap-2 mt-6">
        {/* Prev Icon */}
        <IoIosArrowBack
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`text-2xl cursor-pointer transition ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-300 hover:text-white"
          }`}
        />

        {/* Page Numbers */}
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

        {/* Next Icon */}
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

      {/* filter component */}
      <FilterDialog open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
