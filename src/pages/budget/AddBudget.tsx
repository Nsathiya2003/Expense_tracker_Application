import { useState } from "react";

export default function AddBudget() {
  const [notifyType, setNotifyType] = useState("percentage");
  const [notifyPercent, setNotifyPercent] = useState(80);

  return (
    <>
      <div className="h-min-screen p-2">
        <h1 className="text-[#548f54] text-bold text-xl font-semibold px-8">
          Add Budget
        </h1>

        <div className="rounded-2xl p-4 w-[450px] mx-4">
          {/* Category */}
          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="category"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Category<span className="text-red-600 p-2">*</span>
            </label>
            <select
              id="category"
              className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
              bg-[rgba(255,255,255,0.15)] text-white"
            >
              <option>Select Category</option>
              <option value="Food">Food</option>
              <option value="Family">Family</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Month */}
          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="month"
              className="text-sm text-white mb-2 font-medium"
            >
              Choose Month<span className="text-red-600 p-2">*</span>
            </label>
            <select
              id="month"
              className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
              bg-[rgba(255,255,255,0.15)] text-white"
            >
              <option>Select Month</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>

          {/* Budget Amount */}
          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="budget_amount"
              className="text-sm text-white mb-2 font-medium"
            >
              Budget Amount<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="budget_amount"
              placeholder="Enter your amount"
              className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
              bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
              text-white text-sm placeholder:text-gray-300
              focus:outline-none focus:ring-2 focus:ring-green-500 
              transition-all duration-200"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col w-full mb-4">
            <label
              htmlFor="budget_date"
              className="text-sm text-white mb-2 font-medium"
            >
              Budget Start Date<span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="budget_date"
              className="w-[350px] h-11 px-4 rounded-lg border border-gray-300 
              bg-[rgba(255,255,255,0.15)] backdrop-blur-md 
              text-white text-sm
              focus:outline-none focus:ring-2 focus:ring-green-500 
              transition-all duration-200"
            />
          </div>

          {/* 🧭 Notification Settings */}
          <div className="flex flex-col w-[360px]">
            <label className="text-sm text-white mb-2 font-medium">
              When do you want to be notified?
            </label>

            <div className="flex flex-col gap-3 bg-[rgba(255,255,255,0.08)] p-3 rounded-xl border border-gray-600">
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
                  type="number"
                  min="1"
                  max="100"
                  value={notifyPercent}
                  onChange={(e) => setNotifyPercent(Number(e.target.value))}
                  className="w-16 px-2 py-1 rounded bg-[rgba(255,255,255,0.15)] 
                  border border-gray-400 text-white text-sm text-center"
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

          {/* Save Button */}
          <div className="flex justify-start items-start mx-14">
            <button className="bg-[#548f54] hover:bg-[#437543]  w-[200px] text-white font-medium py-2 px-6 my-4 rounded-lg shadow-md transition-all duration-200">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
