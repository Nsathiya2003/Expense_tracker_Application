import { useDashboardSummaryCards } from "../api/dashboard/dashboard-hooks";
import { useAppContext } from "../context/AppContext";
import { CardItems } from "../data/dashboard-card-items";

export default function Cards() {
  const { open } = useAppContext();
  const { data, isLoading, isError } = useDashboardSummaryCards();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-[#2E362E]/70 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 mt-6 px-6">
        Failed to load dashboard summary.
      </p>
    );
  }

  const summary = data?.data;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full px-6
      ${open ? "lg:w-[1180px]" : "lg:w-[1184px]"}`}
    >
      {CardItems.map((item, index) => {
        const Icon = item.icon;
        const apiData = summary?.[item.key];

        // fake progress (optional – replace with real calc later)
        const progress =
          item.key === "budget"
            ? Math.min(
                (summary?.expense?.total / apiData?.total) * 100 || 0,
                100
              )
            : Math.min((apiData?.count / 10) * 100, 100);

        return (
          <div
            key={index}
            className="relative bg-gradient-to-br from-[#2E362E] to-[#1F251F]
  text-white px-5 py-4 rounded-xl shadow-md
  hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2
                  className="text-base font-semibold leading-tight"
                  style={{ color: item.color }}
                >
                  {item.label}
                </h2>
                <p className="text-gray-400 text-sm leading-snug">
                  {item.description}
                </p>
              </div>

              <div
                className="p-2 rounded-md"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
            </div>

            {/* Primary KPI */}
            <div className="mb-2">
              <p className="text-sm text-gray-400 mb-1">Total Amount</p>
              <h3
                className="text-2xl font-bold leading-tight"
                style={{ color: item.color }}
              >
                ₹{apiData?.total?.toLocaleString() ?? 0}
              </h3>
            </div>

            {/* Secondary KPI */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Records (30 days)</p>
              <p className="text-sm font-semibold text-white">
                {apiData?.count ?? 0}
              </p>
            </div>

            {/* Mini progress bar */}
            <div className="mb-2">
              <div className="h-1.5 bg-[#3A423A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Last 30 days</span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                Active
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
