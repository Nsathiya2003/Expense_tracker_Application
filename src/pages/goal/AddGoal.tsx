export default function AddGoal() {
  return (
    <div className="h-min-screen">
      <h1 className="text-[#548f54] text-2xl font-semibold px-2">Add Goal</h1>

      <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1200px] mx-auto">
        {/* Row: Goal Name, Target Amount, Target Date, Notes */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Goal Name */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="goal_name"
              className="text-sm text-white mb-2 font-medium"
            >
              Goal Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="goal_name"
              placeholder="Enter your goal"
              className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Target Amount */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="target_amount"
              className="text-sm text-white mb-2 font-medium"
            >
              Target Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="target_amount"
              placeholder="Enter amount"
              className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Target Date */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="target_date"
              className="text-sm text-white mb-2 font-medium"
            >
              Target Date/Deadline <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              id="target_date"
              className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col flex-1">
            <label
              htmlFor="notes"
              className="text-sm text-white mb-2 font-medium"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              placeholder="Add notes"
              rows={1}
              className="w-full h-11 px-4 rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            ></textarea>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="notify_exceed"
              className="h-5 w-5 accent-green-400 hover:cursor-pointer"
            />
            <label htmlFor="notify_exceed" className="text-white text-sm">
              Notify when goal is exceeded
            </label>
          </div>
          {/* Save Button */}
          <div className="flex justify-start  ">
            <button className="bg-[#548f54] hover:bg-[#5B3256] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
