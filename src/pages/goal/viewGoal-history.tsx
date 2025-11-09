import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import GoalHistoryTable from "./goalHistory-table";

const data = [
  { month: "Jan", saved: 3000 },
  { month: "Feb", saved: 2500 },
  { month: "Mar", saved: 4000 },
  { month: "Apr", saved: 2000 },
];

export default function GoalHistory() {
  const goal = {
    name: "Buy a Bike",
    target: 20000,
    saved: 9500,
    startDate: "2025-01-01",
    targetDate: "2025-06-30",
    category: "Personal",
  };

  const progress = (goal.saved / goal.target) * 100;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/goal");
  };

  return (
    <>
      <div>
        <IoIosArrowBack
          className="flex items-center justify-center w-8 h-8 rounded-3xl border-2 border-gray-300 
bg-[rgba(34,197,94,0.8)] hover:bg-white/5 cursor-pointer active:bg-[rgba(34,197,94,0.8)] transition-colors duration-150 
focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#77dd77]"
          onClick={handleNavigate}
        ></IoIosArrowBack>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-2 p-4 w-full max-w-[1200px] mx-auto">
        {/* Left: Summary Card */}
        <div className="bg-[#1E1E2E] border border-[#2B2B40] p-6 rounded-2xl shadow-md w-full lg:w-1/2 transition-all hover:shadow-lg hover:scale-[1.01]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#00E6A8]">
              Goal Summary
            </h2>
            <span className="text-sm text-gray-400 bg-[#2C2C45] px-3 py-1 rounded-lg">
              {goal.category}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Goal Name</span>
              <span className="text-white font-medium">{goal.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Target Amount</span>
              <span className="text-white font-medium">
                ₹{goal.target.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Saved So Far</span>
              <span className="text-[#77dd77] font-medium">
                ₹{goal.saved.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#2B2B40] pt-2">
              <span className="text-gray-400">Remaining</span>
              <span className="text-white font-medium">
                ₹{(goal.target - goal.saved).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-sm font-medium text-[#00E6A8]">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-[#2C2C45] rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#00E6A8] to-[#77dd77] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-5 flex justify-between text-xs text-gray-400">
            <p>
              Start: <span className="text-white">{goal.startDate}</span>
            </p>
            <p>
              Target: <span className="text-white">{goal.targetDate}</span>
            </p>
          </div>
        </div>

        {/* Right: Bar Chart */}
        <div className="bg-[#1E1E2E] border border-[#2B2B40] p-6 rounded-2xl shadow-md w-full lg:w-1/2">
          <h2 className="text-lg font-semibold mb-3 text-[#00C8DC]">
            Monthly Savings Progress
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2C2C45" />
              <XAxis dataKey="month" stroke="#ccc" fontSize={11} />
              <YAxis stroke="#ccc" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#252545",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="saved"
                fill="rgba(34,197,94,0.85)"
                radius={[6, 6, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <GoalHistoryTable />
    </>
  );
}
