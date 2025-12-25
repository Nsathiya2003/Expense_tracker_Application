// import { useState, useMemo } from "react";
// import { MdDelete } from "react-icons/md";
// import { useNotificationFilter } from "../../api/notification/notification-hooks";

// type TabType = "all" | "unread" | "read";

// export interface NotificationItem {
//   _id: string;
//   title: string;
//   message: string;
//   fullMessage: string;
//   read: boolean;
// }

// export const ViewAllNotification = () => {
//     const [activeTab, setActiveTab] = useState<TabType>("all");
//     const [expandedId, setExpandedId] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);

//     const itemsPerPage = 6;

//     /* ======================================================
//       🔥 BUILD FILTER PAYLOAD (LIKE INCOME FILTER)
//     ====================================================== */
//     const filterPayload = useMemo(() => {
//       if (activeTab === "read") {
//         return {
//           page: currentPage,
//           limit: itemsPerPage,
//           read: true,
//         };
//       }

//       if (activeTab === "unread") {
//         return {
//           page: currentPage,
//           limit: itemsPerPage,
//           read: false,
//         };
//       }

//       return {
//         page: currentPage,
//         limit: itemsPerPage, // all
//       };
//     }, [activeTab, currentPage]);

//     /* ======================================================
//       🔥 API CALL
//     ====================================================== */
//     const { data, isLoading } = useNotificationFilter(filterPayload);

//     const notifications: NotificationItem[] = data?.data || [];
//     const totalPages = data?.pagination?.totalPages || 1;

//     /* ======================================================
//       UI STATES
//     ====================================================== */
//     const [selectedIds, setSelectedIds] = useState<string[]>([]);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [deleteMode, setDeleteMode] = useState<"single" | "bulk" | null>(null);
//     const [deleteId, setDeleteId] = useState<string | null>(null);

//     /* ======================================================
//       BULK ACTIONS
//     ====================================================== */
//     const handleSelectAll = () => {
//       if (selectedIds.length === notifications.length) {
//         setSelectedIds([]);
//       } else {
//         setSelectedIds(notifications.map((n) => n._id));
//       }
//     };

//     const handleBulkDeleteRequest = () => {
//       if (selectedIds.length === 0) return;
//       setDeleteMode("bulk");
//       setShowConfirm(true);
//     };

//     const handleDeleteConfirmed = () => {
//       // 🔥 Call delete API here later
//       setShowConfirm(false);
//       setSelectedIds([]);
//       setDeleteId(null);
//       setDeleteMode(null);
//     };

//     if (isLoading) {
//       return <p className="text-white p-10">Loading notifications...</p>;
//     }

//   return (
//     <div className="flex flex-col w-full h-full px-10 py-8 bg-[#1b1b2f] text-white">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold text-[#54af54] mb-6">
//         Notifications
//       </h1>

//       {/* Tabs */}
//       <div className="flex justify-between items-center border-b border-gray-700 mb-6">
//         <div className="flex gap-6">
//           {(["all", "unread", "read"] as TabType[]).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setCurrentPage(1);
//                 setExpandedId(null);
//                 setSelectedIds([]);
//               }}
//               className={`capitalize pb-2 text-sm font-medium transition ${
//                 activeTab === tab
//                   ? "border-b-2 border-[#54af54] text-[#54af54]"
//                   : "text-gray-400 hover:text-gray-200"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Bulk actions */}
//         <div className="flex items-center gap-3 text-sm">
//           <button
//             onClick={handleSelectAll}
//             className="px-3 py-1 rounded-md bg-[#2e2e4a] hover:bg-[#3a3a5c]"
//           >
//             Select All
//           </button>

//           <button
//             onClick={handleBulkDeleteRequest}
//             disabled={selectedIds.length === 0}
//             className={`px-3 py-1 rounded-md transition ${
//               selectedIds.length === 0
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//           >
//             Delete Selected
//           </button>
//         </div>
//       </div>

//       {/* Notification List */}
//       <div className="flex flex-col divide-y divide-gray-700 flex-1">
//         {notifications.map((item) => {
//           const isExpanded = expandedId === item._id;
//           const isSelected = selectedIds.includes(item._id);

//           return (
//             <div
//               key={item._id}
//               onClick={() => setExpandedId(isExpanded ? null : item._id)}
//               className={`group cursor-pointer px-3 py-3 transition-all
//               hover:bg-[#232347]
//               ${!item.read ? "border-l-2 border-[#54af54] pl-2" : ""}
//               ${isSelected ? "ring-1 ring-[#54af54]" : ""}
//             `}
//             >
//               {/* ROW */}
//               <div className="flex items-start gap-3">
//                 {/* Checkbox */}
//                 <input
//                   type="checkbox"
//                   checked={isSelected}
//                   onChange={(e) => {
//                     e.stopPropagation();
//                     setSelectedIds((prev) =>
//                       e.target.checked
//                         ? [...prev, item._id]
//                         : prev.filter((id) => id !== item._id)
//                     );
//                   }}
//                   className="mt-1"
//                 />

//                 {/* Unread Dot */}
//                 {!item.read && (
//                   <span className="w-2 h-2 mt-2 rounded-full bg-[#54af54]" />
//                 )}

//                 {/* Content */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-center gap-3">
//                     <p
//                       className={`text-sm truncate ${
//                         item.read
//                           ? "font-medium text-gray-400"
//                           : "font-semibold text-white"
//                       }`}
//                     >
//                       {item.title}
//                     </p>

//                     <span className="text-xs text-gray-500 whitespace-nowrap">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <p
//                     className={`text-sm truncate ${
//                       item.read ? "text-gray-500" : "text-gray-400"
//                     }`}
//                   >
//                     {item.message}
//                   </p>
//                 </div>

//                 {/* Delete */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setDeleteId(item._id);
//                     setDeleteMode("single");
//                     setShowConfirm(true);
//                   }}
//                   className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
//                 >
//                   <MdDelete />
//                 </button>
//               </div>

//               {/* Expanded Body */}
//               {isExpanded && (
//                 <div className="mt-3 ml-7 pl-4 border-l border-[#54af54] text-sm text-gray-300">
//                   {item.fullMessage}
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {notifications.length === 0 && (
//           <p className="text-gray-400 text-center py-10">
//             No notifications found
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center gap-4 mt-6 text-sm">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 rounded bg-[#2e2e4a] disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="text-gray-300">{currentPage}</span>

//         <button
//           onClick={() => setCurrentPage((p) => p + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 rounded bg-[#2e2e4a] disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* Delete Confirmation */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
//           <div className="bg-[#2d2d50] p-6 rounded-lg w-80">
//             <p className="mb-4 text-sm">Are you sure you want to delete?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="text-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirmed}
//                 className="text-red-500 font-semibold"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import {
  useNotificationFilter,
  useMarkNotificationAsRead,
  useDeleteNotifications,
} from "../../api/notification/notification-hooks";

type TabType = "all" | "unread" | "read";

export const ViewAllNotification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const itemsPerPage = 6;

  /* ================= FILTER PAYLOAD ================= */
  const filterPayload = useMemo(() => {
    if (activeTab === "read")
      return { page: currentPage, limit: itemsPerPage, read: true };
    if (activeTab === "unread")
      return { page: currentPage, limit: itemsPerPage, read: false };
    return { page: currentPage, limit: itemsPerPage };
  }, [activeTab, currentPage]);

  /* ================= API ================= */
  const { data, isLoading, refetch } = useNotificationFilter(filterPayload);
  const notifications = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  /* ================= HOOKS ================= */
  const markAsReadMutation = useMarkNotificationAsRead();
  const deleteNotificationsMutation = useDeleteNotifications();

  /* ================= HANDLERS ================= */
  interface NotificationItem {
    _id: string;
    title: string;
    message: string;
    fullMessage: string;
    read: boolean;
  }

  const handleExpand = async (item: NotificationItem) => {
    const isOpening = expandedId !== item._id;
    setExpandedId(isOpening ? item._id : null);

    if (isOpening && !item.read) {
      markAsReadMutation.mutate([item._id], {
        onSuccess: () => {
          refetch(); // refresh notification list
        },
      });
    }
  };

  // Bulk mark as read
  const handleMarkAsRead = (ids: string[]) => {
    if (ids.length === 0) return;
    markAsReadMutation.mutate(ids, {
      onSuccess: () => {
        setSelectedIds([]);
        refetch();
      },
    });
  };

  // Bulk delete
  const handleBulkDelete = (ids: string[]) => {
    if (ids.length === 0) return;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete selected notifications?"
    );
    if (!confirmDelete) return;

    deleteNotificationsMutation.mutate(ids, {
      onSuccess: () => {
        setSelectedIds([]);
        refetch();
      },
    });
  };

  // // Single delete (no confirmation)
  // const handleSingleDelete = (id: string) => {
  //   deleteNotificationsMutation.mutate([id], {
  //     onSuccess: () => {
  //       refetch();
  //     },
  //   });
  // };

  if (isLoading)
    return <p className="p-10 text-gray-400">Loading notifications...</p>;

  return (
    <div className="flex flex-col w-full h-full px-10 py-8 bg-[#1b1b2f] text-white">
      <h1 className="text-2xl font-semibold text-[#54af54] mb-6">
        Notifications
      </h1>

      {/* Tabs */}
      {/* Tabs + Actions */}
      <div className="flex justify-between items-center border-b border-gray-700 mb-6">
        {/* Tabs */}
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

        {/* Bulk Actions */}
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => {
              if (selectedIds.length === notifications.length) {
                setSelectedIds([]);
              } else {
                setSelectedIds(notifications.map((n) => n._id));
              }
            }}
            className="px-3 py-1 rounded bg-[#2e2e4a] hover:bg-[#3a3a5c]"
          >
            {selectedIds.length === notifications.length
              ? "Unselect All"
              : "Select All"}
          </button>

          <button
            onClick={() => handleMarkAsRead(selectedIds)}
            disabled={selectedIds.length === 0}
            className={`px-3 py-1 rounded transition ${
              selectedIds.length === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Mark as Read
          </button>

          <button
            onClick={() => handleBulkDelete(selectedIds)}
            disabled={selectedIds.length === 0}
            className={`px-3 py-1 rounded transition ${
              selectedIds.length === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="flex flex-col divide-y divide-gray-700 flex-1">
        <div className="flex flex-col divide-y divide-gray-700 flex-1">
          {notifications.map((item) => {
            const isExpanded = expandedId === item._id;
            const isSelected = selectedIds.includes(item._id);

            return (
              <div
                key={item._id}
                onClick={() => handleExpand(item)}
                className={`group flex gap-3 px-4 py-3 cursor-pointer transition-all
          ${!item.read ? "bg-[#26265a]" : "bg-[#1f1f3a]"} 
          hover:bg-[#2f2f6b] 
          ${isSelected ? "ring-1 ring-[#54af54]" : ""}
        `}
              >
                {/* LEFT GREEN LINE for unread */}
                {!item.read && (
                  <div className="w-1 bg-[#54af54] rounded-full" />
                )}

                {/* CHECKBOX */}
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
                  className="mt-1"
                />

                {/* GREEN DOT for new/unread */}
                {!item.read && (
                  <span className="w-2 h-2 mt-2 rounded-full bg-[#54af54]" />
                )}

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-4">
                    <p
                      className={`text-sm truncate ${
                        item.read
                          ? "font-medium text-gray-400"
                          : "font-semibold text-white"
                      }`}
                    >
                      {item.title}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p
                    className={`text-sm truncate ${
                      item.read ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {item.message}
                  </p>

                  {isExpanded && (
                    <div className="mt-3 ml-7 pl-4 border-l-2 border-[#54af54] text-sm text-gray-300">
                      {item.fullMessage}
                    </div>
                  )}
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // setDeleteId(item._id);
                    // setShowConfirm(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No notifications found
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-[#2e2e4a] disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-300">{currentPage}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-[#2e2e4a] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
