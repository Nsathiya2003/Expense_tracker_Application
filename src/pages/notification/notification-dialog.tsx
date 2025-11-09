import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type TabType = "all" | "unread" | "read";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  fullMessage: string;
  read: boolean;
}

export default function NotificationDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notification");
    onClose();
  };

  const notifications: Record<TabType, NotificationItem[]> = {
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
          "A payment of ₹5,000 was successfully received in your bank account ending with 5123. Keep an eye on your income tracker for details.",
        read: true,
      },
      {
        id: 4,
        title: "Goal Reminder",
        message: "You’re 20% away from your savings goal.",
        fullMessage:
          "Keep saving! You're just ₹2,000 away from reaching your monthly goal. Small consistent savings make a big difference.",
        read: false,
      },
      {
        id: 5,
        title: "Expense Alert",
        message: "You exceeded your dining budget this week.",
        fullMessage:
          "Your weekly dining budget of ₹2,000 has been exceeded. Consider reducing outside food expenses for better balance.",
        read: true,
      },
    ],
    unread: [
      {
        id: 2,
        title: "Reminder",
        message: "Don't forget to update today’s expenses.",
        fullMessage:
          "You haven’t logged any expenses for today. Keeping track daily helps maintain your savings goal consistency.",
        read: false,
      },
      {
        id: 4,
        title: "Goal Reminder",
        message: "You’re 20% away from your savings goal.",
        fullMessage:
          "Keep saving! You're just ₹2,000 away from reaching your monthly goal. Small consistent savings make a big difference.",
        read: false,
      },
    ],
    read: [
      {
        id: 1,
        title: "Budget Updated",
        message: "Your monthly limit increased to ₹15,000.",
        fullMessage:
          "Your budget for the month has been successfully updated to ₹15,000. You can adjust categories or limits anytime under Settings > Budget tab.",
        read: true,
      },
      {
        id: 3,
        title: "Payment Received",
        message: "₹5,000 credited to your bank account.",
        fullMessage:
          "A payment of ₹5,000 was successfully received in your bank account ending with 5123. Keep an eye on your income tracker for details.",
        read: true,
      },
      {
        id: 5,
        title: "Expense Alert",
        message: "You exceeded your dining budget this week.",
        fullMessage:
          "Your weekly dining budget of ₹2,000 has been exceeded. Consider reducing outside food expenses for better balance.",
        read: true,
      },
    ],
  };

  const currentList = notifications[activeTab];

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

        <Dialog.Content
          className={`absolute top-[60px] right-[20px] bg-[#2E2E48] text-white p-6 rounded-2xl 
          shadow-2xl border border-gray-700 w-[450px]
          data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Notifications
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 border-b border-gray-700 mb-4">
            {(["all", "unread", "read"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedId(null);
                }}
                className={`capitalize pb-2 px-10 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-[#54af54] text-[#54af54]"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {currentList.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all
                    ${
                      item.read
                        ? "bg-[#2d2d50]/70 border-[#3e3e66] opacity-80"
                        : "bg-[#3d3d6b] border-[#6ee7b7]/30"
                    } hover:brightness-110`}
                >
                  {/* Header Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {!item.read && (
                        <div className="w-2 h-2 mt-2 rounded-full bg-[#6ee7b7] animate-pulse" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Delete notification ID: ${item.id}`);
                      }}
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Delete notification"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>

                  {/* Expanded Full Message */}
                  {isExpanded && (
                    <div className="mt-2 border-t border-[#3e3e66]/60 pt-2 text-xs text-gray-300 leading-relaxed animate-fadeIn">
                      {item.fullMessage}
                    </div>
                  )}
                </div>
              );
            })}

            {currentList.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6 italic">
                No notifications found.
              </p>
            )}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => handleClick()}
              className="text-[#54af54] text-sm font-medium hover:underline"
            >
              View All Notifications
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
