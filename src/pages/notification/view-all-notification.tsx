import { useState } from "react";
import { MdDelete } from "react-icons/md";

type TabType = "all" | "unread" | "read";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  fullMessage: string;
  read: boolean;
}

export const ViewAllNotification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [notifications, setNotifications] = useState<
    Record<TabType, NotificationItem[]>
  >({
    all: [
      {
        id: 1,
        title: "Budget Updated",
        message: "Your monthly limit increased to ₹15,000.",
        fullMessage:
          "Your budget for the month has been successfully updated to ₹15,000. You can adjust categories or limits anytime under Settings > Budget tab.",
        read: true,
      },
      {
        id: 2,
        title: "Reminder",
        message: "Don't forget to update today’s expenses.",
        fullMessage:
          "You haven’t logged any expenses for today. Keeping track daily helps maintain your savings goal consistency.",
        read: false,
      },
      {
        id: 3,
        title: "Payment Received",
        message: "₹5,000 credited to your bank account.",
        fullMessage:
          "A payment of ₹5,000 was successfully received in your bank account ending with 5123.",
        read: true,
      },
      {
        id: 4,
        title: "Goal Reminder",
        message: "You’re 20% away from your savings goal.",
        fullMessage:
          "Keep saving! You're just ₹2,000 away from reaching your monthly goal.",
        read: false,
      },
      {
        id: 5,
        title: "Expense Alert",
        message: "You exceeded your dining budget this week.",
        fullMessage: "Your weekly dining budget of ₹2,000 has been exceeded.",
        read: true,
      },
    ],
    unread: [],
    read: [],
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState<"single" | "bulk" | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const itemsPerPage = 6;
  const currentList = notifications[activeTab];
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const paginatedData = currentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Bulk actions ---
  const handleSelectAll = () => {
    if (selectedIds.length === currentList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentList.map((item) => item.id));
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => ({
      ...prev,
      all: prev.all.map((n) => ({ ...n, read: true })),
    }));
  };

  const handleBulkDeleteRequest = () => {
    if (selectedIds.length === 0) return;
    setDeleteMode("bulk");
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    setNotifications((prev) => {
      if (deleteMode === "single" && deleteId !== null) {
        return {
          ...prev,
          all: prev.all.filter((n) => n.id !== deleteId),
        };
      } else if (deleteMode === "bulk") {
        return {
          ...prev,
          all: prev.all.filter((n) => !selectedIds.includes(n.id)),
        };
      }
      return prev;
    });
    // Reset state
    setDeleteId(null);
    setSelectedIds([]);
    setDeleteMode(null);
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col w-full h-full text-white px-10 py-8 bg-[#1b1b2f]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-[#54af54]">
          All Notifications
        </h1>
      </div>

      {/* Tabs + Bulk Actions */}
      <div className="flex justify-between items-center border-b border-gray-700 mb-8">
        <div className="flex gap-6">
          {(["all", "unread", "read"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedId(null);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className={`capitalize pb-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-[#54af54] text-[#54af54]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bulk actions */}
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 rounded-md bg-[#2e2e4a] hover:bg-[#3e3e66] transition"
          >
            {selectedIds.length === currentList.length
              ? "Unselect All"
              : "Select All"}
          </button>
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1 rounded-md bg-[#2e2e4a] hover:bg-[#3e3e66] transition"
          >
            Mark All Read
          </button>
          <button
            onClick={handleBulkDeleteRequest}
            disabled={selectedIds.length === 0}
            className={`px-3 py-1 rounded-md transition ${
              selectedIds.length === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-5 flex-1">
        {paginatedData.map((item) => {
          const isExpanded = expandedId === item.id;
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={`flex flex-col gap-2 p-5 rounded-xl border transition-all cursor-pointer ${
                item.read
                  ? "bg-[#2d2d50]/70 border-[#3e3e66]"
                  : "bg-[#3d3d6b] border-[#6ee7b7]/30"
              } ${isSelected ? "ring-2 ring-[#54af54]" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, item.id]
                          : prev.filter((id) => id !== item.id)
                      );
                    }}
                    className="mt-1 accent-[#54af54]"
                  />
                  {!item.read && (
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#6ee7b7] animate-pulse" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-gray-300 mt-1">{item.message}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(item.id);
                    setDeleteMode("single");
                    setShowConfirm(true);
                  }}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <MdDelete />
                </button>
              </div>

              {isExpanded && (
                <div className="mt-2 border-t border-[#3e3e66]/60 pt-2 text-xs text-gray-300 leading-relaxed animate-fadeIn">
                  {item.fullMessage}
                </div>
              )}
            </div>
          );
        })}

        {paginatedData.length === 0 && (
          <p className="text-gray-400 text-center col-span-full italic py-10">
            No notifications found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`px-3 py-1 rounded-lg text-sm transition ${
            currentPage === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-500 text-white"
          }`}
        >
          Prev
        </button>

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

        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          className={`px-3 py-1 rounded-lg text-sm transition ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-500 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#2d2d50] p-6 rounded-2xl w-[320px] shadow-lg border border-gray-600 animate-fadeIn">
            <p className="text-lg font-semibold mb-3 text-white">
              Confirm Delete
            </p>
            <p className="text-sm text-gray-300 mb-5">
              {deleteMode === "bulk"
                ? `Are you sure you want to delete ${selectedIds.length} selected notifications?`
                : "Are you sure you want to delete this notification?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 rounded-md bg-gray-600 hover:bg-gray-500 text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
