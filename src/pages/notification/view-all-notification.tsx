import { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { useNotificationFilter } from "../../api/notification/notification-hooks";

type TabType = "all" | "unread" | "read";

export interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  fullMessage: string;
  read: boolean;
}

export const ViewAllNotification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  /* ======================================================
     🔥 BUILD FILTER PAYLOAD (LIKE INCOME FILTER)
  ====================================================== */
  const filterPayload = useMemo(() => {
    if (activeTab === "read") {
      return {
        page: currentPage,
        limit: itemsPerPage,
        read: true,
      };
    }

    if (activeTab === "unread") {
      return {
        page: currentPage,
        limit: itemsPerPage,
        read: false,
      };
    }

    return {
      page: currentPage,
      limit: itemsPerPage, // all
    };
  }, [activeTab, currentPage]);

  /* ======================================================
     🔥 API CALL
  ====================================================== */
  const { data, isLoading } = useNotificationFilter(filterPayload);

  const notifications: NotificationItem[] = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  /* ======================================================
     UI STATES
  ====================================================== */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState<"single" | "bulk" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* ======================================================
     BULK ACTIONS
  ====================================================== */
  const handleSelectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map((n) => n._id));
    }
  };

  const handleBulkDeleteRequest = () => {
    if (selectedIds.length === 0) return;
    setDeleteMode("bulk");
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = () => {
    // 🔥 Call delete API here later
    setShowConfirm(false);
    setSelectedIds([]);
    setDeleteId(null);
    setDeleteMode(null);
  };

  if (isLoading) {
    return <p className="text-white p-10">Loading notifications...</p>;
  }

  return (
    <div className="flex flex-col w-full h-full text-white px-10 py-8 bg-[#1b1b2f]">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-[#54af54] mb-6">
        Notifications
      </h1>

      {/* Tabs */}
      <div className="flex justify-between items-center border-b border-gray-700 mb-8">
        <div className="flex gap-6">
          {(["all", "unread", "read"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
                setExpandedId(null);
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
            className="px-3 py-1 rounded-md bg-[#2e2e4a]"
          >
            Select All
          </button>
          <button
            onClick={handleBulkDeleteRequest}
            disabled={selectedIds.length === 0}
            className={`px-3 py-1 rounded-md ${
              selectedIds.length === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="grid gap-5 flex-1">
        {notifications.map((item) => {
          const isExpanded = expandedId === item._id;
          const isSelected = selectedIds.includes(item._id);

          return (
            <div
              key={item._id}
              onClick={() => setExpandedId(isExpanded ? null : item._id)}
              className={`p-5 rounded-xl border cursor-pointer ${
                item.read ? "bg-[#2d2d50]" : "bg-[#3d3d6b]"
              } ${isSelected ? "ring-2 ring-[#54af54]" : ""}`}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, item._id]
                          : prev.filter((id) => id !== item._id)
                      );
                    }}
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-300">{item.message}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(item._id);
                    setDeleteMode("single");
                    setShowConfirm(true);
                  }}
                >
                  <MdDelete />
                </button>
              </div>

              {isExpanded && (
                <div className="mt-3 text-sm text-gray-300">
                  {item.fullMessage}
                </div>
              )}
            </div>
          );
        })}

        {notifications.length === 0 && (
          <p className="text-gray-400 text-center">No notifications found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>{currentPage}</span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#2d2d50] p-6 rounded-lg">
            <p className="mb-4">Confirm delete?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={handleDeleteConfirmed} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
