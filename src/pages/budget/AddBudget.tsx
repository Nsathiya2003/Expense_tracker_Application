import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function AddBudget() {
  const [notifyType, setNotifyType] = useState("percentage");
  const [notifyPercent, setNotifyPercent] = useState(80);

  return (
    <div className="w-full">
      <h1 className="text-[#548f54] text-2xl font-semibold mb-4 px-2">
        Add Budget
      </h1>

      <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Category */}
          {/* Category */}
          <div className="flex flex-col w-[350px] mb-4 relative">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Category <span className="text-red-600">*</span>
            </label>

            <div className="relative w-[260px]">
              <select
                id="category"
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option value="" className="bg-[#2E2E48] text-white">
                  Select Category
                </option>
                <option value="Food" className="bg-[#2E2E48] text-white">
                  Food
                </option>
                <option value="Family" className="bg-[#2E2E48] text-white">
                  Family
                </option>
                <option value="Education" className="bg-[#2E2E48] text-white">
                  Education
                </option>
                <option value="Travel" className="bg-[#2E2E48] text-white">
                  Travel
                </option>
                <option value="Others" className="bg-[#2E2E48] text-white">
                  Others
                </option>
              </select>

              {/* Custom ▼ icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Month */}
          <div className="flex flex-col w-[350px] mb-4 relative">
            <label
              htmlFor="month"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Month <span className="text-red-600">*</span>
            </label>

            <div className="relative w-[260px]">
              <select
                id="month"
                className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
      bg-[rgba(255,255,255,0.15)] text-white text-sm
      focus:outline-none focus:ring-2 focus:ring-green-400
      transition-all duration-200 appearance-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option value="" className="bg-[#2E2E48] text-white">
                  Select Month
                </option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m) => (
                  <option key={m} value={m} className="bg-[#2E2E48] text-white">
                    {m}
                  </option>
                ))}
              </select>

              {/* Custom ▼ icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Budget Amount */}
          <div className="flex flex-col">
            <label
              htmlFor="budget_amount"
              className="text-sm text-white mb-2 font-medium"
            >
              Budget Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="budget_amount"
              placeholder="Enter your amount"
              className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white 
              focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label
              htmlFor="budget_date"
              className="text-sm text-white mb-2 font-medium"
            >
              Budget Start Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="budget_date"
              className="h-11 px-4 rounded-lg border border-gray-400 
              bg-[rgba(255,255,255,0.15)] text-white text-sm 
              focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Notification Settings */}
          <div className="flex flex-col lg:col-span-2">
            <label className="text-sm text-white mb-2 font-medium">
              When do you want to be notified?
            </label>
            <div className="flex flex-col gap-3 p-4 ">
              {/* Option 1: Percentage */}
              <label className="flex items-center gap-3 text-sm text-white">
                <input
                  type="radio"
                  name="notify"
                  value="percentage"
                  checked={notifyType === "percentage"}
                  onChange={(e) => setNotifyType(e.target.value)}
                  className="accent-[#548f54] hover:cursor-pointer"
                />
                <span>When spending reaches</span>
                <input
                  type="text"
                  min="1"
                  max="100"
                  value={notifyPercent}
                  onChange={(e) => setNotifyPercent(Number(e.target.value))}
                  className="w-16 px-2 py-1 rounded bg-[rgba(255,255,255,0.15)] 
  border-b border-gray-400 text-white text-sm text-center 
  focus:outline-none focus:border-green-400 transition-all duration-200"
                />
                <span>%</span>
              </label>

              {/* Option 2: Exceed */}
              <label className="flex items-center gap-3 text-sm text-white">
                <input
                  type="radio"
                  name="notify"
                  value="exceed"
                  checked={notifyType === "exceed"}
                  onChange={(e) => setNotifyType(e.target.value)}
                  className="accent-[#548f54] hover:cursor-pointer"
                />
                <span>Only when I exceed the limit</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-start">
          <button className="bg-[#548f54] hover:bg-[#437543] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
