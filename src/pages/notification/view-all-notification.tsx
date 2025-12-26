import { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import {
  useNotificationFilter,
  useMarkNotificationAsRead,
  useDeleteNotifications,
} from "../../api/notification/notification-hooks";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type TabType = "all" | "unread" | "read";
export const ViewAllNotification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);

  const itemsPerPage = 6;

  /* ---------------- FILTER PAYLOAD ---------------- */
  const filterPayload = useMemo(() => {
    if (activeTab === "read") {
      return { page: currentPage, limit: itemsPerPage, read: true };
    }
    if (activeTab === "unread") {
      return { page: currentPage, limit: itemsPerPage, read: false };
    }
    return { page: currentPage, limit: itemsPerPage };
  }, [activeTab, currentPage]);

  /* ---------------- API ---------------- */
  const { data, isLoading, refetch } = useNotificationFilter(filterPayload);

  const notifications = data?.data || [];
  const pagination = data?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage ?? currentPage > 1;
  const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;

  const markAsReadMutation = useMarkNotificationAsRead();
  const deleteNotificationsMutation = useDeleteNotifications();

  /* ---------------- HANDLERS ---------------- */

  const handleExpand = async (item: any) => {
    const isOpening = expandedId !== item._id;
    setExpandedId(isOpening ? item._id : null);

    if (isOpening && !item.read) {
      markAsReadMutation.mutate([item._id], {
        onSuccess: () => refetch(),
      });
    }
  };

  const handleMarkAsRead = (ids: string[]) => {
    if (!ids.length) return;

    markAsReadMutation.mutate(ids, {
      onSuccess: () => {
        setSelectedIds([]);
        refetch();
      },
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    if (!ids.length) return;
    setPendingDeleteIds(ids);
    setOpenDeletePopup(true);
  };

  const confirmBulkDelete = () => {
    deleteNotificationsMutation.mutate(pendingDeleteIds, {
      onSuccess: () => {
        setSelectedIds([]);
        setPendingDeleteIds([]);
        setOpenDeletePopup(false);
        refetch();
      },
    });
  };

  const handleSingleDelete = (id: string) => {
    deleteNotificationsMutation.mutate([id], {
      onSuccess: () => refetch(),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
    setSelectedIds([]);
  };

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return <p className="p-10 text-gray-400">Loading notifications...</p>;
  }

  /* ======================== UI ======================== */

  return (
    <div className="flex flex-col w-full h-full px-10 py-8 bg-[#1b1b2f] text-white">
      <h1 className="text-2xl font-semibold text-[#54af54] mb-6">
        Notifications
      </h1>

      {/* ---------------- TABS ---------------- */}
      <div className="flex justify-between items-center border-b border-gray-700 mb-6">
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
              className={`capitalize pb-2 text-sm ${
                activeTab === tab
                  ? "border-b-2 border-[#54af54] text-[#54af54]"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------------- BULK ACTIONS ---------------- */}
        <div className="flex gap-2 text-sm">
          <button
            onClick={() =>
              setSelectedIds(
                selectedIds.length === notifications.length
                  ? []
                  : notifications.map((n: any) => n._id)
              )
            }
            className="px-3 py-1 rounded bg-[#2e2e4a] hover:bg-[#3a3a5c]"
          >
            {selectedIds.length === notifications.length
              ? "Unselect All"
              : "Select All"}
          </button>

          <button
            onClick={() => handleMarkAsRead(selectedIds)}
            disabled={!selectedIds.length}
            className={`px-3 py-1 rounded ${
              selectedIds.length
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Mark as Read
          </button>

          <button
            onClick={() => handleBulkDelete(selectedIds)}
            disabled={!selectedIds.length}
            className={`px-3 py-1 rounded ${
              selectedIds.length
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="flex flex-col divide-y divide-gray-700 flex-1">
        {notifications.map((item: any) => {
          const isExpanded = expandedId === item._id;
          const isSelected = selectedIds.includes(item._id);

          return (
            <div
              key={item._id}
              onClick={() => handleExpand(item)}
              className={`group flex gap-3 px-4 py-3 cursor-pointer
                ${!item.read ? "bg-[#26265a]" : "bg-[#1f1f3a]"}
                hover:bg-[#2f2f6b]
                ${isSelected ? "ring-1 ring-[#54af54]" : ""}`}
            >
              {!item.read && <div className="w-1 bg-[#54af54] rounded-full" />}

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

              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="truncate">{item.title}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-400 truncate">{item.message}</p>

                {isExpanded && (
                  <div className="mt-3 ml-7 pl-4 border-l-2 border-[#54af54] text-sm">
                    {item.fullMessage}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSingleDelete(item._id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
              >
                <MdDelete />
              </button>
            </div>
          );
        })}

        {!notifications.length && (
          <p className="text-center text-gray-400 py-10">
            No notifications found
          </p>
        )}
      </div>

      {/* ---------------- PAGINATION (INCOME STYLE) ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-6">
          <button
            onClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className={`p-2 rounded-lg ${
              hasPrevPage
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-800 opacity-40 cursor-not-allowed"
            }`}
          >
            <IoIosArrowBack />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-[40px] h-10 rounded-lg ${
                  currentPage === page
                    ? "bg-[#548f54] text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={`p-2 rounded-lg ${
              hasNextPage
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-800 opacity-40 cursor-not-allowed"
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};
